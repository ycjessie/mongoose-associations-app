const album = require('../models/album');

const router = require('express').Router();
const dayjs=require('dayjs');
const Album = require('../models/album').Album;
const Song = require('../models/album').Song;
//descrtucting structure combining line 2 and 3 corresponding line 16 of user.js
// const{user,tweet}=require('../models/user');

// NEW USER FORM
router.get('/new', (req, res) => {
  res.render('albums/new.ejs');
});
// ADD EMPTY FORM TO album SHOW PAGE TO ADD song TO A album
router.get('/:albumId', (req, res) => {
    // find album in db by id and add new song
    Album.findById(req.params.albumId, (error, album) => {
      res.render('albums/show.ejs', { album });
    });
  });
//index
router.get('/',(req,res)=>{
    Album.find({},(err,foundAllalbums)=>{
        // console.log('all albums');
        // res.send('all albums here')
        if (err) res.send(err);
        res.render('albums/index.ejs',{
            data:foundAllalbums,
            
        })
    })
})
// CREATE A NEW Album
router.post('/', (req, res) => {
    Album.create(req.body, (error, newAlbum) => {
      //res.send(newAlbum);
      res.redirect(`/albums/${newAlbum._id}`)
    });
  });
// CREATE song EMBEDDED IN album
router.post('/:albumId/songs', (req, res) => {
    console.log(req.body);
    // store new song in memory with data from request body
    const newSong = new Song({ songName: req.body.songName });
  
    // find album in db by id and add new song
    Album.findById(req.params.albumId, (error, album) => {
      album.songs.push(newSong);
      album.save((err, album) => {
        res.redirect(`/albums/${album.id}`);
      });
    });
  });
// UPDATE song EMBEDDED IN A album DOCUMENT
router.put('/:albumId/songs/:songId', (req, res) => {
    console.log('PUT ROUTE');
    // set the value of the album and song ids
    const albumId = req.params.albumId;
    const songId = req.params.songId;
  
    // find album in db by id
    Album.findById(albumId, (err, foundAlbum) => {
      // find song embedded in album
      const foundSong = foundAlbum.songs.id(songId);
      // update song text and completed with data from request body
      foundSong.songName = req.body.songName;
      foundAlbum.save((err, savedAlbum) => {
        //res.json(foundSong);
        res.redirect(`/albums/${albumId}`);
      });
    });
});
//EDIT
router.get('/:albumId/songs/:songId/edit', (req, res) => {
    // set the value of the album and song ids
    const albumId = req.params.albumId;
    const songId = req.params.songId;
    // find album in db by id
    Album.findById(albumId, (err, foundAlbum) => {
      // find song embedded in album
      const foundSong = foundAlbum.songs.id(songId);
      // update song text and completed with data from request body
      res.render('songs/edit.ejs', { foundAlbum, foundSong });
    });
});
//DELETE 
router.delete('/:albumId/songs/:songId',(req,res)=>{
        console.log('delete album')
       // res.send('delete album')
       const albumId = req.params.albumId;
       const songId = req.params.songId;
     
       // find album in db by id
    Album.findById(albumId, (err, foundAlbum) => {
         // find song embedded in albu,
         foundAlbum.songs.id(songId).remove();
         // update song text and completed with data from request body
         foundAlbum.save((err, savedAlbum) => {
           res.redirect(`/albums/${foundAlbum.id}`);
        });
    });
});
module.exports = router;