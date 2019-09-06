const express = require('express');
const BodyParser = require("body-parser");
const Student = require("mongodb").MongoClient;
const Admin = require("mongodb").MongoClient;
const Professor = require("mongodb").MongoClient;
const Library = require("mongodb").MongoClient;
const MarkList = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const cors = require('cors')

const app = express();

const CONNECTION_URL = "mongodb+srv://jayvishaal:jayvishaal144@firstcluster-v0xlb.mongodb.net/test?retryWrites=true&w=majority";
const DATABASE_NAME = "College-Management-System";

app.use(cors())
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

//PORT
const port = process.env.PORT || 5000;


Student.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        throw error;
    }
    database = client.db(DATABASE_NAME);
    studentCollection = database.collection("Student");
    console.log("Connected to `" + DATABASE_NAME + "`! -- Student");
});

Professor.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        throw error;
    }
    database = client.db(DATABASE_NAME);
    professorCollection = database.collection("Professor");
    console.log("Connected to `" + DATABASE_NAME + "`! -- Professor");
});

Admin.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        throw error;
    }
    database = client.db(DATABASE_NAME);
    adminCollection = database.collection("Admin");
    console.log("Connected to `" + DATABASE_NAME + "`! -- Admin");
});

Library.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        throw error;
    }
    database = client.db(DATABASE_NAME);
    libraryCollection = database.collection("Library");
    console.log("Connected to `" + DATABASE_NAME + "`! -- Library");
});

MarkList.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        throw error;
    }
    database = client.db(DATABASE_NAME);
    marklistCollection = database.collection("MarkList");
    console.log("Connected to `" + DATABASE_NAME + "`! -- MarkList");
});

// post methods for creating
app.post('/api/Student/createUser', (req, res) => {
    console.log("createUser Api called");
    studentCollection.insert(req.body, (error, result) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.send(result.ops);
    });
});

app.post('/api/Professor/createUser', (req, res) => {
    console.log("createUser Api called");
    professorCollection.insert(req.body, (error, result) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.send(result.ops);
    });
});

app.post('/api/Admin/createUser', (req, res) => {
    console.log("createUser Api called");
    adminCollection.insert(req.body, (error, result) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.send(result.ops);
    });
});

app.post('/api/MarkList/createMarklist',(req,res) => {
    console.log("createUser Api called ");
    marklistCollection.insert(req.body,(error,result) =>{
        if(error){
            return res.status(500).send(error);
        }
        res.send(result.ops);
    });
});


//Also Login API
//get methods  for getting data

//get students of a class
app.get('/api/Student/Class/:ClassID', (req, res) => {
    studentCollection.find({ "classId": req.params.ClassID }).toArray((error, result) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.send(result);
    });
});

//get student by id
app.get('/api/Student/:Id', (req, res) => {
    studentCollection.findOne({ "studentId": req.params.Id }, (error, result) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.send(result);
    });
});

//get professor by Department ID
app.get('/api/Professor/:DeptID', (req, res) => {
    professorCollection.find({ "deptId": req.params.DeptID }).toArray((error, result) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.send(result);
    });
});

//get professor by ID
app.get('/api/Professor/:Id', (req, res) => {
    professorCollection.findOne({ "professorId": req.params.Id }, (error, result) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.send(result);
    });
});

//get admin data by ID
app.get('/api/Admin/:Id', (req, res) => {
    adminCollection.findOne({ "id": req.params.Id }, (error, result) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.send(result);
    });
});


//api for library
app.post('/api/Library/createBook', (req, res) => {
    console.log("createBook Api called");
    libraryCollection.insert(req.body, (error, result) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.send(result.ops);
    });
});

app.get('/api/Library/Book/:Id', (req, res) => {
    libraryCollection.findOne({ "bookId": req.params.Id }, (error, result) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.send(result);
    });
});

app.get('/api/Library/Book/Genre/:Genre', (req, res) => {
    libraryCollection.find({ "genre": req.params.Genre }).toArray((error, result) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.send(result);
    });
});

app.get('/api/Library/Book/Author/:Author', (req, res) => {
    libraryCollection.find({ "Author": req.params.Author }).toArray((error, result) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.send(result);
    });
});

app.get('/api/Library/Book/Name/:Name', (req, res) => {
    libraryCollection.find({ "bookName": req.params.Name }).toArray((error, result) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.send(result);
    });
});

//borrow library book to student
app.put('/api/Library/BorrowBook/:bookID/:studentID', (req, res) => {
    libraryCollection.findOne({ "bookId": req.params.bookID }, (error, re) => {
        console.log("api called level0");
        if (error) {
            return res.status(500).send(error);
        }
        else {
            let result = re;
            console.log(result);
            let c = parseInt(result.count);
            console.log(c);
            if (c >= 1) {
                console.log("api called level1", result, "c = ", c);
                studentCollection.findOne({ "studentId": req.params.studentID }, (error1, result1) => {
                    let r = result1;
                    if (error1) {
                        return res.status(500).send(error1);
                    }
                    else {
                        console.log("result1 = ", r);
                        let bookBorowed = parseInt(r.bookBorrowed);
                        bookBorowed = bookBorowed + 1;
                        console.log(bookBorowed);
                        if (bookBorowed - 1 >= 1) {
                            console.log("result 1 = ", r);
                            for (i in r.libraryInfo) {
                                if (r.libraryInfo[i].bookId == req.params.bookID && r.libraryInfo[i].returned ==true ) {
                                    res.status(206).send("Book already borrowed");
                                    console.log(r.libraryInfo[i]);
                                    return;
                                }
                            }
                            let jsonarray = r.libraryInfo;
                            console.log(jsonarray);
                            jsonarray.push({ "bookId": req.params.bookID, "returned": false });
                            console.log(jsonarray);
                            studentCollection.update({ "studentId": req.params.studentID }, { $set: { "libraryInfo": jsonarray, "bookBorrowed": bookBorowed } }, (error2, result2) => {
                                if (error2) {
                                    return res.status(500).send(error2);
                                }
                                else {
                                    console.log("api called level2", result1);
                                    let count = c - 1;
                                    let jsarray = result.historyOfUse;
                                    let today = new Date();
                                    // let date = today.getDate() +'/'+(today.getMonth()+1)+'/'+today.getFullYear();
                                    let returnDate = new Date();
                                    console.log(today);
                                    returnDate.setDate(today.getDate() + 15);
                                    // let rdate = returnDate.getDate()+'/'+returnDate.getMonth()+'/'+returnDate.getFullYear();
                                    console.log("Return Date = ", returnDate);
                                    console.log("result = ", result, " HOU = ", jsarray);
                                    jsarray.push({ "studentId": req.params.studentID, "borrowDate": today, "returnDate": returnDate, "returned": false });
                                    libraryCollection.update({ "bookId": req.params.bookID }, { $set: { "count": count.toString(), "historyOfUse": jsarray } }, (error3, result3) => {
                                        if (error3) {
                                            res.status(500).send(error3);
                                        }
                                        else {
                                            res.send(result2);
                                        }
                                    });
                                }

                            });

                        }
                        else {
                            let jsonarray = r.libraryInfo;
                            console.log(jsonarray);
                            jsonarray.push({ "bookId": req.params.bookID, "returned": false });
                            console.log(jsonarray);
                            studentCollection.update({ "studentId": req.params.studentID }, { $set: { "libraryInfo": jsonarray, "bookBorrowed": bookBorowed } }, (error2, result2) => {
                                if (error2) {
                                    return res.status(500).send(error2);
                                }
                                else {
                                    console.log("api called level2", result1);
                                    let count = c - 1;
                                    let jsarray = result.historyOfUse;
                                    let today = new Date();
                                    // let date = today.getDate() +'/'+(today.getMonth()+1)+'/'+today.getFullYear();
                                    let returnDate = new Date();
                                    console.log(today);
                                    returnDate.setDate(today.getDate() + 15);
                                    // let rdate = returnDate.getDate()+'/'+returnDate.getMonth()+'/'+returnDate.getFullYear();
                                    console.log("Return Date = ", returnDate);
                                    console.log("result = ", result, " HOU = ", jsarray);
                                    jsarray.push({ "studentId": req.params.studentID, "borrowDate": today, "returnDate": returnDate, "returned": false });
                                    libraryCollection.update({ "bookId": req.params.bookID }, { $set: { "count": count.toString(), "historyOfUse": jsarray } }, (error3, result3) => {
                                        if (error3) {
                                            res.status(500).send(error3);
                                        }
                                        else {
                                            res.send(result2);
                                        }
                                    });

                                }

                            });

                        }

                    }
                });
            }
            else {
                res.send("Book not Available !! Sorry :( ! ")
                //Book not Available
            }

        }
    });
});

//return book to library
app.put('/api/Library/ReturnBook/:bookID/:studentID', (req, res) => {
    studentCollection.findOne({ "studentId": req.params.studentID }, (error, re) => {
        console.log("api level0 called return book");
        if (error) {
            return res.status(500).send(error);
        }
        else {
            let flagm =0;
            let flagu =0;
            let result = re;
            console.log(result);
            if (result.bookBorrowed >= 1) {
                console.log("!!!result  = ",result.libraryInfo);
                let jsonarray = result.libraryInfo;
                // console.log(jsonarray);
                for (i in result.libraryInfo) {
                    if (result.libraryInfo[i].bookId == req.params.bookID) {
                        flagu = flagu+1;
                        if (result.libraryInfo[i].returned == false) {
                            //make student la returned true 
                            // jsonarray.push({ "bookId": req.params.bookID, "returned": true });
                            jsonarray[i] = { "bookId": req.params.bookID, "returned": true };
                            let bookBorowed = parseInt(result.bookBorrowed ) -1;
                            console.log(jsonarray);
                            studentCollection.update({ "studentId": req.params.studentID }, {$set : {"libraryInfo" : jsonarray , "bookBorrowed" : bookBorowed}},(error1,result1) => {
                                if(error1){
                                    return res.status(500).send(error1);
                                }
                                else{
                                    libraryCollection.findOne({"bookId" : req.params.bookID},(err,redata) =>{
                                        if(err){
                                            return res.status(500).send(err);
                                        }
                                        else{
                                            let data = redata.historyOfUse;
                                            let fine = 0;
                                            let c = parseInt(redata.count);
                                            c = c+1;
                                            for( i in data){
                                                if(data[i].studentId = req.params.studentID){
                                                    let today = new Date();
                                                    if(today <= data[i].returnDate){
                                                        fine =0;
                                                    }
                                                    else{
                                                       fine=20; 
                                                    }
                                                    let j = {"studentId" : req.params.studentID,"borrowDate" : data[i].borrowDate ,"returnDate" : data[i].returnDate , "returned" : true ,"fine" : fine};
                                                    data[i]=j;
                                                }
                                            }
                                            libraryCollection.update({"bookId" : req.params.bookID},{$set : {"historyOfUse" : data,"count" : c.toString()}},(error2,result2) => {
                                                if(error2){
                                                    return res.status(500).send(error2);
                                                }
                                                else{
                                                    console.log("sucess");
                                                    return res.send(result2);
                                                }
                                            });
                                        }
                                    });

                                }
                            });
                            //make librabry bok hstory matthanum
                        }
                        else {
                            //already returned 
                            console.log(result.libraryInfo[i]);
                            flagm =flagm +1;
                        }
                    }
                }
                if(flagm == flagu){
                    return   res.status(206).send("Already Book Returned");
                }
            }
            else {
                return res.status(206).send("No books borrowed Yet");
            }
        }
    });
});


app.listen(port, () => {
    console.log(`Listening on Port ${port}..`);
});

//Library JSON
// {
// 	"bookId" : "1",
// 	"bookName": "First Book",
// 	"Author" : "Author 1",
// 	"genre" :  "Sci-Fi",
// 	"year"  : "2010",
// 	"count" : "5",
// 	"historyOfUse" : [{"studentId" : "","borrowDate" : "","returnDate" : ""}]
// }

//Student JSON
// {
// 	"classId" : "A",
// 	"studentId" : "1001",
// 	"studentName" : "First Student",
// 	"password"    : "studentpassword",
// 	"parentPno"   : "7358125151",
// 	"parentEmail" : "jayvishaalj.01@gmail.com",
// 	"studentEmail" : "student@jayvishaalmail.com",
// 	"libraryInfo" : [{"bookId": "","returned" :""}],
//  "bookBorrowed" : "0"
// }

//Admin JSON
// {
//     "id": "1001",
//     "name": "firstAdmin",
//     "user": "Admin",
//     "password": "adminuser"
// }


//Professor JSON
// {
// 	"deptId" : "CSE",
// 	"professorId" : "101",
// 	"professorName" : "First Professor",
// 	"password"    : "professsorpassword",
// 	"professorPno"   : "7358125151",
// 	"professorEmail" : "jayvishaalj.01@gmail.com",
// 	"classHandling" : [{"classId": "","subjects" :[{"subjectId" : "","subjectName" : ""}]}]
// }

//MarkList JSON
// {
//     "StudentId" : "1001",
//     "StudentName" : "Student1",
//     "Subject1"  : 100,
//     "Subject2"  : 100,
//     "Subject3"  : 100,
//     "subject4"  : 100,
//     "Subject5"  : 100,
//     "Attendance" : {"total" : 100,"attended" : 89}
// }