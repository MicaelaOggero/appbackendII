import passport from "passport";
import local from "passport-local";
import StudentService from "../services/student.service.js";
import TeacherService from "../services/teacher.service.js";
import AdminService from "../services/admin.service.js";
import { createHash, isValidPassword } from "../utils/hashingUtils.js";
import jwt, { ExtractJwt } from "passport-jwt";
import { config } from "./config.js";
import GithubStrategy from 'passport-github2'

const LocalStrategy = local.Strategy;
const JWTStrategy = jwt.Strategy;

const cookieExtractor = (req) => {
  return req && req.cookies ? req.cookies["coderPracticaIntegrado"] : null;
};

const initializePassport = () => {
  passport.use(
    "jwt",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: config.secret_jwt,
      },
      async (jwt_payload, done) => {
        try {
          return done(null, jwt_payload.user);
        } catch (error) {
          return done(null, false, { message: error.message });
        }
      }
    )
  );

  passport.use(
    "register",
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },
      async (req, username, password, done) => {
        const { firstName, lastName, role } = req.body;

        if (!firstName || !lastName || !role || !username || !password) {
          return done(null, false, { message: "Required parameters are missing" });
        }

        if (role !== "student" && role !== "teacher" && role !== "admin") {
          return done(null, false, { message: "Invalid role" });
        }

        try {
          const user =
            role === "student"
              ? await StudentService.getStudentByEmail(username)
              : role === "teacher"
              ? await TeacherService.getTeacherByEmail(username)
              : await AdminService.getAdminByEmail(username);

          if (user) return done(null, false, { message: "User already exists" });

          const newUser = {
            email: username,
            password: createHash(password),
            firstName,
            lastName,
            role,
          };

          const result =
            role === "student"
              ? await StudentService.createStudent(newUser)
              : role === "teacher"
              ? await TeacherService.createTeacher(newUser)
              : await AdminService.createAdmin(newUser);

          return done(null, result);
        } catch (error) {
          return done(null, false, { message: error.message });
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      {
        usernameField: "email",
        passReqToCallback: true,
      },
      async (req, username, password, done) => {
        const { role } = req.body;

        if (!role || !username || !password) {
          return done(null, false, "Required parameters are missing");
        }

        if (role !== "student" && role !== "teacher" && role !== "admin") {
          return done(null, false, "Invalid role");
        }

        try {
          const user =
            role === "student"
              ? await StudentService.getStudentByEmail(username)
              : role === "teacher"
              ? await TeacherService.getTeacherByEmail(username)
              : await AdminService.getAdminByEmail(username);

          if (!user) return done(null, false, { message: "User not found" });

          if (!isValidPassword(user, password))
            return done(null, false, { message: "Invalid password" });

          return done(null, user);
        } catch (error) {
          return done(null, false, { message: error.message });
        }
      }
    )
  );

  passport.use('github',new GithubStrategy(
    {
        clientID:'Iv23liVO3hmIXzGk5UtZ',
        clientSecret:'222d0e6c2160ddcb333a8d2c33344eb76fe71f3d',
        callbackURL:'http://localhost:8080/api/auth/githubcallback',
        passReqToCallback: true 
    },async (req,_,__,profile,done) => {
        
        try {
            let user = await StudentService.getByIdGithub(profile._json.id);

            if (!user) {
               
                const newUser = {
                    firstName: profile._json.name || "No Name",
                    lastName: profile._json.login || "No Last Name",
                    email: profile._json.email || "no-email@github.com",
                    role: "student",
                    idGithub: String(profile._json.id),
                    
                };

                user = await StudentService.createStudent(newUser);
            }

            return done(null, user);

        } catch (error) {
            return done(error, false, { message: error.message });
        }
        }
    ))

};

export default initializePassport;
