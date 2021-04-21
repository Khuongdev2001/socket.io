const app = require("express")();
const cors = require("cors");
const httpServer = require("http").createServer(app);
app.use(cors());
const options = {
    cors: {
        origin: '*',
        methods: ["POST"]
    }
};
const io = require("socket.io")(httpServer, options);
io.on("connection", (socket) => {
    socket.on("test", (item) => {
        console.log(item);
    });
    app.get("/test", (req, res) => {
        socket.emit("test", req.query.name);
        res.send("test");
    });
    socket.emit("test", "1234");
    socket.to(socket.id).emit("test", "test server node id");
});

app.get("/", (req, res) => {
    res.end("chao banj");
})
httpServer.listen(3000);