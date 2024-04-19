export const checkImage = (file)=>{
    let err = ""
    if(!file) return err = "File Does not exist"


    if(file.size > 1024 * 1024) // 1mb
    err = "The largest image size is 1mb"


    if(file.type !== 'image/jpeg' && file.type !== 'image/png')
    err = "Imgae formt is incorrect"

    return err
}

export const imageUpload = async(images) =>{
   let imgArr = []
   for(const item of images){
      const formData = new FormData()

        if(item.camera){
            formData.append("file",item.camera)
        }else{
            formData.append("file",item) 
        }



       formData.append("upload_preset","c9ctvbly")
       formData.append("cloud_name","di7sfvemo")

       const res = await fetch(' https://api.cloudinary.com/v1_1/di7sfvemo/image/upload',{
           method:'POST',
           body:formData
       })
       const data = await res.json()
       imgArr.push({public_id:data.public_id,url:data.secure_url})
        
   }
   return imgArr
}   