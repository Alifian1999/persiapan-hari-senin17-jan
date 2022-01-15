const express = require('express')


const app = express()
const PORT= 5000

const db = require('./connections/db')

app.set('view engine', 'hbs')

app.use('/public' , express.static(__dirname + '/public')) //path agar css dan gambar tampil

app.get('/',(request,response)=>{
    response.send("index")
})

app.use(express.urlencoded({extended : false}))

let isLogin = true

let blogs = [
    {
        title : 'Pasar Coding di Indonesia Dinilai Masih Menjanjikan',
        postAt : '15 Jul 2021 22:30 WIB',
        author : 'Alifian Alfirazi',
        content : 'Ketimpangan sumber daya manusia (SDM) di sektor digital masih menjadi isu yang belum terpecahkan. Berdasarkan penelitian ManpowerGroup, ketimpangan SDM global, termasuk Indonesia, meningkat dua kali lipat dalam satu dekade terakhir. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam, molestiae numquam! Deleniti maiores expedita eaque deserunt quaerat! Dicta, eligendi debitis?'
    }
]

console.log(blogs);

app.get('/blog',(request,response)=>{

   db.connect(function(err,client,done){
    if(err) throw err

        client.query('SELECT * FROM tb_blog', function(err,result){
            if(err) throw err

            console.log(result.rows);
            let data= result.rows
            response.render("blog", {isLogin : isLogin, blogs : data})
        })

   })
    
})

app.get('/add-blog',(request,response)=>{
    response.render("add-blog")
})

let month= ['january','february','march','april','may','june','july','august','september','october','november','december']
function getFullTime(time){
    let date = time.getDate()
    let monthIndex= time.getMonth()
    let year = time.getFullYear()
    let hours= time.getHours()
    let minutes= time.getMinutes()
    let fullTime= (`${date} ${month[monthIndex]} ${year} ${hours}: ${minutes} WIB`)
    return fullTime
    }

app.post('/blog',(request,response)=>{
    //console.log(request.body);

     let data={
         title : request.body.inputTitle,
         content :request.body.inputContent,
         author : 'Alifian Alfirazi',
         postAt : getFullTime(new Date())
     }
     blogs.push(data)
     console.log(data);
      response.redirect('/blog')
})

app.get('/delete-blog/:index', function(request, response){
 let index = request.params.index;

 blogs.splice(index,1) 
 console.log(index);

 response.redirect('/blog')
})

app.get('/contact',(request,response)=>{
    response.render("contact")
})

app.get('/index',(request,response)=>{
    response.render("index")
})


app.listen(PORT,()=>{
    console.log("server starting on localhost");
})

app.get('/register',(request,response)=>{
    response.render("register")
})
app.get('/blog-detail/:id',function (request,response){
    
    let blogId = request.params.id
    response.render('blog-detail' , {blog :{
        id : blogId,
        title : 'selamat datang di web',
        content : 'ini adalah content',
        author : 'alifian',
        postAt : '12 jan 2022 11:30 WIB'
    }}) 
})