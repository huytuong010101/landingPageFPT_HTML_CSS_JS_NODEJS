var express = require("express")
var nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
var app = express();
app.set("view engine","ejs");
app.set("views","./views")
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }))

app.listen(process.env.PORT || 3000);
app.get("/",function(req,res){
	res.render("index",{Note : ""});
})
app.post("",function(req,res){
	res.render("index",{Note : "Cảm ơn " + req.body.FullName + " đã để lại lời nhắn. Chúng tôi sẽ phản hồi cho bạn sớm nhất!"});
	var transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'muabandatnht@gmail.com',
			pass: '010101tuonghuy.'
		}
	});
	var mailOptions = {
		from: 'muabandatnht@gmail.com',
		to: 'Landsdana@gmail.com',
		subject: 'Phản hồi khách hàng',
		text: 'Tên khách hàng' + req.body.FullName +'-Email:' + req.body.Email + '-Phone:'+ req.body.Phone +'-Nội dung:' + req.body.Content
	};
	transporter.sendMail(mailOptions, function(error, info){
		if (error) {
			//console.log(error);
		} else {
			//console.log('Email sent: ' + info.response);
		}
	});
})
app.get("/:link",function(req,res){
	var link = req.params.link;
	if ((link == "ban-dat-khu-do-thi-fpt-da-nang") || (link == "ban-dat-khu-do-thi-fpt-da-nang-gia-re")){
		res.render("index",{Note : ""});
	} else {
		res.render("Page404");
	}
})
app.get("*",function(req,res){
	res.render("Page404");
})