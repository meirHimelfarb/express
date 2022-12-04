const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()
const cors = require("cors");
const { get } = require('http');
app.use(cors());
app.use(express.static('public'))
// console.log(path);
let type 
let info = fs.statSync('./')

console.log(info);
app.get('/', (req, res) => {
    
    fs.readdir('./public', (err, data) => {
        if(err){
            throw new Error(err)
        }
        
        const dataWithDetails = data.map((file) => {
            type = path.extname(file) ? path.extname(file): 'folder'
            return {
                name: file,
                type: type
            }
        })
        res.send(JSON.stringify(dataWithDetails))
    })
})
app.get('/info/:fileName', (req, res) => {
    fs.stat(`./public/${req.params.fileName}`, (err, data) => {
        if(err){
            throw new Error(err)
        }
        const fileINfo = {
            size: data.size,
            birthtime: data. birthtime
        }
        res.send(JSON.stringify(fileINfo))
        
    })
})
app.get('/copy/:fileName', (req, res) => {
    const endPoint = req.params.fileName.split('.')[1]
    fs.copyFile(`./public/${req.params.fileName}`, `./public/${req.params.fileName}(${Math.floor(Math.random() *10)}).${endPoint}`, (err) => {
        if(err){
            throw err
        }
        res.send('the file has been copied')
    })
})
app.put('/rename/:fileName', (req, res) => {
    const endPoint = req.params.fileName.split('.')[1]
    
    
    fs.rename(`./public/${req.params.fileName}`, `./public/${req.headers.name}.${endPoint}`, (err) => {
        if(err){
            console.log(err);
            throw err
        }
        res.send(`the name has been changed reload to show`)
    })
    
})
app.delete('/delete/:fileName', (req, res) => {
    fs.unlink(`./public/${req.params.fileName}`, (err) => {
        if(err){
            throw err
        }
        res.send('The file has been deleted')
    })
})
app.delete('/deleteFolder/:namefolder', (req, res) => {
    fs.rmdir(`./public/${req.params.namefolder}`, (err) =>{
        if(err){
            throw err
        }
        res.send('The folder has been deleted')
    })
})
app.get('/show/:namefolder', (req, res) => {
    fs.readdir(`./public/${req.params.namefolder}`, (err,data) => {
        if(err){
            throw new Error(err)
        }
         type = path.extname
        const dataWithDetails = data.map((file) => {
            type = path.extname(file) ? path.extname(file): 'folder'
            return {
                name: file,
                type: type
            }
        })
        res.send(JSON.stringify(dataWithDetails))
    })
})
let extname
app.get('enter/:namefolder', (req, res) => {
    fs.readdir(`./public/${req.params.namefolder}`, (err, data) => {
        if(err){
            throw new Error(err)
        }
        
        const dataWithDetails = data.map((file) => {
            extname = path.extname(file) ? path.extname(file): 'folder'
            return {
                name: file,
                type: extname

            }
        })
        res.send(JSON.stringify(dataWithDetails))
    })
})
app.listen(8010, () => console.log('the server listening in port 8010'))
