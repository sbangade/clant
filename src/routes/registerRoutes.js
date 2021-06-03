import { addnewRegister,
         getRegister,
         userLogin,
         getUserProfile,
         getEmail,
         addDriver,
         addUserRequest,
         updateDriver,
         updatePassenger
} from '../controller/registerController';

const routes = (app) => {
app.route('/register')
    .get((req,res, next) => {
        console.log(`Request from: ${req.originalUrl}`)
        console.log(`Request type: ${req.method}`)
        next();
    }, getRegister)
    .post(addnewRegister);

    // Login Route
app.route('/login')
    .post(userLogin);
 
// get a specific user's profile    
app.route('/profile/:userID')
    .get(getUserProfile) 

// Forgot password    
app.route('/forgot')
    .post(getEmail);

// driver posting route    
app.route('/driver')
    .post(addDriver);

app.route('/driver/:productID')
    .put(updateDriver);    

// passenger posting    
app.route('/user')
    .post(addUserRequest);
    
// update passenger posting
app.route('/user/:passengerID')
    .put(updatePassenger);    

}


export default routes;