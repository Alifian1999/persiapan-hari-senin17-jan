
 let blogs=[] 
 //variable blogs berfungsi untuk menampung data dari blog

 function addBlog(event){
   //function ini berfungsi untuk menambah postingan,yaitu dengan cara mengambil nilai2 dari input dan akan memasukkan nilainya ke function renderBlog()
     event.preventDefault()
     //function preventDefault() berfungsi supaya browser tidak merefresh secara otomatis
     let category = document.getElementById('input-blog-category').value
     let author = document.getElementById('input-blog-author').value
     let title = document.getElementById('input-blog-title').value
     let content= document.getElementById('input-blog-content').value
     let image= document.getElementById('input-blog-image').files

     if(author==''){
      return alert('author tidak boleh kosong')
    }else if(title==''){
      return alert('title tidak boleh kosong')
    }else if(content==''){
      return alert('content tidak boleh kosong')
    }else if(category==''){
      return alert('category tidak boleh kosong')
    }

     image= URL.createObjectURL(image[0])

     let blog={
         id: Date.now(),
         //date.now merupakan keyword dari javascript yang menunjukkan berapa milisecond dari tgl 1 january
         title,
         content,
         image,
         author, 
         postAt: new Date(),
         category,
         //new.date adalah keyword dari javascript yang menunjukkan tanggal dan waktu pada pada saat ini
     }
     document.getElementById('input-blog-title').value=''
     document.getElementById('input-blog-content').value=''
     document.getElementById('input-blog-author').value=''
     document.getElementById('input-blog-category').value=''
     //documen.getElement valuenya sama dengan string kosong berfungsi apabila data yang kita isi di input sudah disubmit maka secara otomatis data2 yg sebelumnya ada di input menjadi kosong

     blogs.push(blog);
     //berfungsi untuk menambahkan data di array dan meletakannya di array yang terakhir dan ini juga menambah panjang(index) dari array      
     renderBlog()

     
      
 }


 function renderBlog(){
   //renderBlog adalah method yg berfungsi untuk menyimpan nilai' input dari function addBlog
   let contentContainer = document.getElementById('contents')
   //contents disini merujuk pada data yang di HTML.
   contentContainer.innerHTML= firstBlogPost()
//saat saya klik button edit blog maka akan memanggil fungsi edit blog yg mana mengembalikan sebuah html yg mengganti 
//html sebelumnya, sebelumnya kan ngga ada input input nya nah keganti ama yg ada inputnya
//di edit blog kita periksa dulu jika id yg kita click sama dgn id yg ada di array jika sama maka hnya blog tersebut
//yang terhapus di dalam edit blog tersebut ada button save blog berfubgsi utnuk mengganti element dan menampilkannyya
//di dalam save blog di dalamnya kita tampung lagi input innput yg kita ingin ubah ke dalam object sama sepeti addbllog
//lalu kita lakuakn pengecekan jika id yg kita click tadi di editbog function yg kitaa krimkan lewat parameter
//sama dengan id yg di array jika sama maka kita ganti elemnt di index i dengn element baru
//lalu kita render lagi
   for(let i=0;i<blogs.length;i++){
     //saya menggunakan looping supaya kita tidak hanya bisa memposting satu namun unlimited post
    contentContainer.innerHTML+=
    //innerhtml += berarti akan menambahkan postingan(tanpa menghpus postingan sebelumnya)
    `<div class="blog-list-item" id="${blogs[i].id}">  
    <div class="blog-image">
      <img src="${blogs[i].image}" alt="" />
    </div>
    <div class="blog-content">
      <div class="btn-group">
        <button class="btn-edit" style="cursor:pointer" onclick="editBlog(${blogs[i].id})">Edit Post</button>
        <button class="btn-delete" style="cursor:pointer" onclick="deleteBlog(${blogs[i].id})">Delete</button>
      </div>
      <h1>
        <a href="blog-detail.html" target="_blank"
          >${blogs[i].title}<a/>
      </h1>
      <div class="detail-blog-content">
        ${getFullTime(new Date())} | ${blogs[i].author}
      </div>
      <div>
      <p>Category : ${blogs[i].category}</p>
      </div>
      <p>
        ${blogs[i].content}
      </p>
      <div style="text-align:right">
        <span style="font-size: 13px; color: gray">
            ${getDistanceTime(blogs[i].postAt)}
        </span>
      </div>
    </div>
  </div>`
  }
 }

function firstBlogPost(){
  //function ini berfungsi untuk pada saat set interval ke triggered makan firstBlog tidak akan hilang/ter refresh
  return ` <div class="blog-list-item">
  <div class="blog-image">
    <img src="assets/blog-img.png" alt="" />
  </div>
  <div class="blog-content">
    <div class="btn-group">
      <button class="btn-edit" style="cursor:pointer">Edit Post</button>
      <button class="btn-delete" style="cursor:pointer">Delete </button>
    </div>
    <h1>
      <a href="blog-detail.html" target="_blank"
        >Pasar Coding di Indonesia Dinilai Masih Menjanjikan</a>
    </h1>
    <div class="detail-blog-content">
      12 Jul 2021 22:30 WIB | Ichsan Emrald Alamsyah
    </div>
    <div class="detail-blog-category">
    <p> Category : Pendidikan</p>
    </div>
    <p>
      Ketimpangan sumber daya manusia (SDM) di sektor digital masih
      menjadi isu yang belum terpecahkan. Berdasarkan penelitian
      ManpowerGroup, ketimpangan SDM global, termasuk Indonesia,
      meningkat dua kali lipat dalam satu dekade terakhir. Lorem ipsum,
      dolor sit amet consectetur adipisicing elit. Quam, molestiae
      numquam! Deleniti maiores expedita eaque deserunt quaerat! Dicta,
      eligendi debitis?
    </p>
    </div>
    </div>`
}

 let month= ['january','february','march','april','may','june','july','august','september','october','november','december']
    
 function getFullTime(time){
     let date = time.getDate()
     let monthIndex= time.getMonth()
     let year = time.getFullYear()
     let hours= time.getHours()
     let minutes= time.getMinutes()
     //get2 diatas merupakan keyword javascript
     let fullTime= (`${date} ${month[monthIndex]} ${year} ${hours}: ${minutes} WIB`)
     return fullTime
     }
     getFullTime(new Date())
     
   function getDistanceTime(time){
     //parameter time disini bernilai waktu sekarang
     let timePost= time
     let timeNow= new Date()
     let distance = timeNow - timePost
     //variable distance bernilai waktu pada saat posting-waktu sekarang
 
     let milisecond= 1000
     let secondInHours= 3600
     let hoursInDay=24
     let minutes= 60
     let seconds= 60
     //untuk mendefinisikan nilai satuan waktu
 
 
     let distanceDay=Math.floor( distance / (milisecond * secondInHours * hoursInDay))
     let distanceHours= Math.floor(distance/ (milisecond * minutes * seconds))
     let distanceMinutes= Math.floor(distance/(milisecond * seconds))
     let distanceSeconds= Math.floor(distance/ (milisecond))
    //math.floor berfungsi untuk membulatkan angka
 
 
     if(distanceDay>=1){
       //kondisi2 untuk mengetahui berapa lama post sudah diposting
        return (`${distanceDay} day ago`);
     }else{
         if(distanceHours >=1){
             return (`${distanceHours} hours ago`);
         }else{
             if(distanceMinutes >=1){
                return (`${distanceMinutes} minutes ago`);
             }else{
                return (`${distanceSeconds} seconds ago`);
             }
         }
     }
 }
  getDistanceTime(new Date())

 setInterval(()=>{
    renderBlog()
  },60000)

//author
//category
//search
//delate //DONE
const deleteBlog = function(id) {
  //console.log(index);
  //kita lakukan looping untuk melakukan menghapus dimana jika i itu sama dengan index dari blog yg ingin kita hapus
  //sama dengan i maka kita lakukan penghapusan misalnya index dari blog yg kita ingin hapus adalah 2  dan i nya dua maka
  //kita bakal hapus blogs di index 2
  for(let i=0;i<blogs.length;i++){
    //disini kita lakukan pengecekan jika i sama dengan index dari paramester
    if(blogs[i].id === id){//blogs[1].id bernilai date.now dan id bernilai date.now
      console.log(blogs[i]);
      //slpice method adlah method array untuk melakukan penghapusan
      //dengan parameter pertama adalah index ke berapa array dihapus, dan parameter ke 2 adalah 
      //berpa jumlah yg ingin kita hapus
      blogs.splice(i,1)
    }
  }
  renderBlog()
}


//
const editBlog= function(id){
  //function ini akan ke triggered apabila function renderBlog sukses berfungsi, dan fungsi function ini untuk meng edit blog yang sudah di post
  const edit = document.getElementById(`${id}`)
  //${id} merujuk ke id yang berada di method renderBlog beserta valuenya
  for(let i=0;i<blogs.length;i++){
    if(blogs[i].id === id){
      //looping berfungsi untuk mengetahui index keberapa yang mau di edit
      //if berfungsi untuk membuat sebuah kondisi yang mana bila id yang berada didalam blog sama dengan id di function editBlog maka value yang berada didalamnya akan terpanggil
        edit.innerHTML =
        //edit.innerHTMl ini akan memungkinkan kita mengedit data" tanpa menghapus data2 sebelumnya.
      `<div class="blog-list-item " id="blog-list-item-js">
      <div class="blog-image">
        <input type="file" class="edit-input" />
      </div>
      <div class="blog-content">
        <div class="btn-group">
          <button class="btn-edit" onclick="saveBlog(${id})" style="cursor:pointer">Save</button>
          <button class="btn-delete" style="cursor:pointer" onclick="deleteBlog(${blogs[i].id})">Delete</button>
        </div>
        <div class="blog-content-input">
        <h1>
          <input class="edit-input-title" type="text" value="${blogs[i].title}"/> 
        </h1>
        <div class="detail-blog-content" id="detail-blog-content-js">
          ${getFullTime(new Date())} | <input type="text" class="edit-input-author" value="${blogs[i].author}"/> 
        </div>
        
        <input type="text" class="edit-input-category" value="${blogs[i].category}"/>
        
        <p>
          <input type="text" class="edit-input-content" value="${blogs[i].content}"/>
        </p>
        </div>
      </div>
    </div>`
    }

  }
}

const saveBlog= function(id){
  console.log(id);
  let author = document.querySelector(`.edit-input-author`).value
  let title = document.querySelector(`.edit-input-title`).value
  let content= document.querySelector(`.edit-input-content`).value
  let image= document.querySelector(`.edit-input`).files
  let category= document.querySelector(`.edit-input-category`).value
  image= URL.createObjectURL(image[0])
  //variable diatas berfungsi memberi tau javascript untuk menyimpan value input di masing2 nama variable

  const blog = {
    id: id,
    category,
    author,
    title,
    content,
    image,
    postAt: new Date()
  }
  //objek blog berfungsi untuk menyimpan atau nilai2 inputan menjadi satu wadah
  if(author==''){
    return alert('author wajib di isi')
  }else if(title==''){
    return alert('title wajib di isi')
  }else if(content==''){
    return alert ('content wajib di isi')
  }else if(category==''){
    return alert('category wajib di isi')
  }


  for(let i=0;i<blogs.length;i++){
    if(blogs[i].id === id){
      blogs.splice(i,1,blog)
      //berfungsi menghapus ataupun mengedit array, blog disini datanya berasal data yang yang diedit
    }
  }
  renderBlog()
  //renderblog dipanggil kesini untuk menyediakan struktur dan menampilkan value2 yang sudah diedit ke browser
  getDistanceTime(blog.postAt)
}
