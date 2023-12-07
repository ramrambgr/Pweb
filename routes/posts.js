var express = require('express');
var router = express.Router();

//import database
var connection = require('../library/database');

/**
 * INDEX POSTS
 */
router.get('/', function (req, res, next) {
    //query
    connection.query('SELECT * FROM ia11 ORDER BY id desc', function (err, rows) {
        if (err) {
            req.flash('error', err);
            res.render('posts', {
                data: ''
            });
        } else {
            //render ke view posts index
            res.render('posts/index', {
                data: rows // <-- data posts
            });
        }
    });
});

/**
 * CREATE POST
 */
router.get('/create', function (req, res, next) {
    res.render('posts/create', {
        nama: '',
        domisili: '',
        jenis_kelamin: '',
        ipk_total: ''
    })
})

/**
 * STORE POST
 */
router.post('/store', function (req, res, next) {
    let nama = req.body.nama;
    let domisili = req.body.domisili;
    let jenis_kelamin = req.body.jenis_kelamin;
    let ipk_total = req.body.ipk_total;
    let errors  = false;

    if(nama.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Silahkan Masukkan Nama");
        // render to add.ejs with flash message
        res.render('posts/create', {
            nama: nama,
            domisili: domisili,
            jenis_kelamin: jenis_kelamin,
            ipk_total: ipk_total
        })
    }

    if(domisili.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Silahkan Masukkan Domisili");
        // render to add.ejs with flash message
        res.render('posts/create', {
            nama: nama,
            domisili: domisili,
            jenis_kelamin: jenis_kelamin,
            ipk_total: ipk_total
        })
    }

    if(jenis_kelamin.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Silahkan Pilih Jenis Kelamin");
        // render to add.ejs with flash message
        res.render('posts/create', {
            nama: nama,
            domisili: domisili,
            jenis_kelamin: jenis_kelamin,
            ipk_total: ipk_total
        })
    }
    if(ipk_total.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Silahkan Masukkan IPK Total");
        // render to add.ejs with flash message
        res.render('posts/create', {
            nama: nama,
            domisili: domisili,
            jenis_kelamin: jenis_kelamin,
            ipk_total: ipk_total
        })
    }

    // if no error
    if(!errors) {

        let formData = {
            nama: nama,
            domisili: domisili,
            jenis_kelamin: jenis_kelamin,
            ipk_total: ipk_total
        }
        
        // insert query
        connection.query('INSERT INTO ia11 SET ?', formData, function(err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                 
                // render to add.ejs
                res.render('posts/create', {
                    nama: formData.nama,
                    domisili: formData.domisili,
                    jenis_kelamin: formData.jenis_kelamin,
                    ipk_total: formData.ipk_total,

                })
            } else {                
                req.flash('success', 'Data Berhasil Disimpan!');
                res.redirect('/posts');
            }
        })
    }

})

/**
 * EDIT POST
 */
router.get('/edit/(:id)', function(req, res, next) {

    let id = req.params.id;
   
    connection.query('SELECT * FROM ia11 WHERE id = ' + id, function(err, rows, fields) {
        if(err) throw err
         
        // if user not found
        if (rows.length <= 0) {
            req.flash('error', 'Data Post Dengan ID ' + id + " Tidak Ditemukan")
            res.redirect('/posts')
        }
        // if user found
        else {
            // render to edit.ejs
            res.render('posts/edit', {
                id:             rows[0].id,
                nama:           rows[0].nama,
                domisili:       rows[0].domisili,
                jenis_kelamin:  rows[0].jenis_kelamin,
                ipk_total:      rows[0].ipk_total
            })
        }
    })
})

/**
 * UPDATE POST
 */
router.post('/update/:id', function(req, res, next) {

    let id              = req.params.id;
    let nama            = req.body.nama;
    let domisili        = req.body.domisili;
    let jenis_kelamin   = req.body.jenis_kelamin;
    let ipk_total       = req.body.ipk_total;
    let errors          = false;

    if(nama.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Silahkan Masukkan Nama");
        // render to edit.ejs with flash message
        res.render('posts/edit', {
            id:             req.params.id,
            nama:           nama,
            domisili:       domisili,
            jenis_kelamin:  jenis_kelamin,
            ipk_total:      ipk_total
        })
    }

    if(domisili.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Silahkan Masukkan Domisili");
        // render to add.ejs with flash message
        res.render('posts/create', {
            nama: nama,
            domisili: domisili,
            jenis_kelamin: jenis_kelamin,
            ipk_total: ipk_total
        })
    }

    if(jenis_kelamin.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Silahkan Pilih Jenis Kelamin");
        // render to add.ejs with flash message
        res.render('posts/create', {
            nama: nama,
            domisili: domisili,
            jenis_kelamin: jenis_kelamin,
            ipk_total: ipk_total
        })
    }
    if(ipk_total.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Silahkan Masukkan IPK Total");
        // render to add.ejs with flash message
        res.render('posts/create', {
            nama: nama,
            domisili: domisili,
            jenis_kelamin: jenis_kelamin,
            ipk_total: ipk_total
        })
    }

    // if no error
    if( !errors ) {   
 
        let formData = {
            nama:           nama,
            domisili:       domisili,
            jenis_kelamin:  jenis_kelamin,
            ipk_total:      ipk_total
        }

        // update query
        connection.query('UPDATE ia11 SET ? WHERE id = ' + id, formData, function(err, result) {
            //if(err) throw err
            if (err) {
                // set flash message
                req.flash('error', err)
                // render to edit.ejs
                res.render('posts/edit', {
                    id:     req.params.id,
                    name:   formData.name,
                    author: formData.author
                })
            } else {
                req.flash('success', 'Data Berhasil Diupdate!');
                res.redirect('/posts');
            }
        })
    }
})

/**
 * DELETE POST
 */
router.get('/delete/(:id)', function(req, res, next) {

    let id = req.params.id;
     
    connection.query('DELETE FROM ia11 WHERE id = ' + id, function(err, result) {
        //if(err) throw err
        if (err) {
            // set flash message
            req.flash('error', err)
            // redirect to posts page
            res.redirect('/posts')
        } else {
            // set flash message
            req.flash('success', 'Data Berhasil Dihapus!')
            // redirect to posts page
            res.redirect('/posts')
        }
    })
})

module.exports = router;