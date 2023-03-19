const RoomController = require('../controllers/rooms.controller');
// const {authenticate} = require("../config/jwt.config"); //took out for deploy
module.exports = (app) => {
    // app.get("/api/rooms", authenticate, RoomController.findAll );  
    // app.get('/api/rooms/:id', authenticate, RoomController.find);
    // app.post('/api/rooms', authenticate, RoomController.create );
    // app.put('/api/rooms/add/:id', authenticate, RoomController.addUser);
    // app.put('/api/rooms/remove/:id', authenticate, RoomController.removeUser);
    // app.delete('/api/rooms/deleteChatRoom/:id', authenticate, RoomController.delete);

    app.get("/api/rooms", RoomController.findAll );  //new routes for deploy
    app.get('/api/rooms/:id', RoomController.find);
    app.post('/api/rooms', RoomController.create );
    app.put('/api/rooms/add/:id', RoomController.addUser);
    app.put('/api/rooms/remove/:id', RoomController.removeUser);
    app.delete('/api/rooms/deleteChatRoom/:id', RoomController.delete);

}
