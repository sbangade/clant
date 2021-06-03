import mongoose from 'mongoose';
import { RegistersSchema, PilotSchema, passengerSchema } from '../models/registerModel';


const Register = mongoose.model('Register', RegistersSchema);
const Passenger = mongoose.model('Passenger', passengerSchema);
const Pilot = mongoose.model('Pilot', PilotSchema);

export const addnewRegister = (req, res) => {
    let newRegister = new Register(req.body);
    Register.find({ Email: req.body.Email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        newRegister.save((err, register) => {
            if (err) {
                res.send(err);
            }
            res.json(register);
        });
      }else{
        return res.status(401).json({
            message: "Email already exist"
          });
      }}); 
    
}

export const getRegister = (req, res) => {
    Register.find({}, (err, register) => {
        if (err) {
            res.send(err);
        }
        res.json(register);
    });
}

export const userLogin = (req, res, next) => {
    Register.find({ Email: req.body.Email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Wrong Username"
        });
      }else{
        Register.find({ Password: req.body.Password })
        .exec()
        .then(user => {
            if (user.length < 1) {
              return res.status(401).json({
                message: "Wrong Password"
              });
            }else{
                res.send('Login Successfully!')
            }
        });
      }
    });
}
 
// Get user's profile by ID
export const getUserProfile = (req, res) => {
    Register.findById(req.params.userID,{"_id":0, "FirstName":1,"LastName":1,"DOB":1,"Is_driver_or_passenger":1,"Image":1,"Mobile":1,"Email":1,"Gender":1,"Car_details":1}, (err, product) => {

        if (err) {
            res.send(err);
        }
        
        res.json(product);
    });
}
export const getEmail = (req, res) => {
    Register.find({ Email: req.body.Email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Email doesnt exist."
        });
      }else{
        return res.status(201).json({
            message: "Login Successfully"
          });
            }
        });
      }

export const addDriver = (req, res) => {
        let newDriver = new Pilot(req.body);
        newDriver.save((err, driver) => {
            if (err) {
                res.send(err);
            }
            else{
                res.json(driver);
            }
            
            // Passenger.find({},(err, login) => {
            //     if (err) {
            //         res.send(err);
            //     }
            //     res.json(login);
            // });
            //  res.json(driver);
        });
    
    }

// update driver
export const updateDriver = (req, res) => {
    Pilot.findOneAndUpdate({_id: req.params.productID}, req.body, { new: true, useFindAndModify: false }, (err, product) => {
        if (err) {
            res.send(err);
        }
        res.json(product);
    });
  }    

// passengers posting

export const addUserRequest = (req, res) => {
    let newUser = new Passenger(req.body);
    newUser.save((err, driver) => {
        if (err) {
            res.send(err);
        }else{
           // res.json(driver);
        //    Pilot.find({FindPassenger: {$eq: true}},{"_id":0,"Locality":1,"RideType":1},(err, login) => {
        //     if (err) {
        //         res.send(err);
        //     }
        //     res.json(login);
        // });
        Register.find({Is_driver_or_passenger: {$eq: true}},{"_id":0,"FirstName":1,"LastName":1,"DOB":1,"Image":1,"Mobile":1,"Email":1,"Gender":1,"Car_details":1},(err, login) => {
            if (err) {
                res.send(err);
            }
            res.json(login);
        });
        
        }
        // Pilot.find({},(err, login) => {
        //     if (err) {
        //         res.send(err);
        //     }
        //     res.json(login);
        // });
       // res.json(driver);
    });

}
export const updatePassenger = (req, res) => {
    Passenger.findOneAndUpdate({_id: req.params.passengerID}, req.body, { new: true, useFindAndModify: false }, (err, product) => {
        if (err) {
            res.send(err);
        }
        res.json(product);
    });
  }     