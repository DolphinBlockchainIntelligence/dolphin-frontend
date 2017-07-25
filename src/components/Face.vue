<template>
  <div id="Face">
    <div class="container">
      <div class="row" style="margin-top: 50px; margin-bottom: 30px; text-align: center">
        <form class="form-inline">
          <label for="exampleInputName2" style="margin-right: 20px">Search by picture</label>
            <span class="btn btn-primary btn-file">
                Upload picture <input type="file" id="searchphoto">
            </span>
        </form>
      </div>
      <hr>
      <div id="faces" class="row">
      </div>
    </div>
    <div id="myModal" class="modal fade" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
          <div class="modal-content">
              <div class="modal-header">
                  <button id="similar" type="button" class="btn btn-warning" style="float: left; padding: 5px 50px">Find similar faces</button>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              </div>
              <div class="modal-body">
                  <img src="" style="max-width: 300px; max-height: 300px; margin: 10px;" align="left">
                  <h3></h3>
                  <p></p>
              </div>
              <div class="modal-footer">
                  <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
              </div>
          </div>
      </div>
    </div>
  </div>
</template>


<script>
import $ from 'jquery'
// var $ = require("jquery")
import AWS from 'aws-sdk'
import '../../node_modules/bootstrap/dist/js/bootstrap.js'
export default {
  name: "Face",
  data: function data() {
    return {

    }
  },
  mounted: function () {
    AWS.config.update({
        accessKeyId: "AKIAIACAV2QTUVXMA2UA",
        secretAccessKey: ""
    });
    var s3 = new AWS.S3({region: "us-east-1"});
    var rekognition = new AWS.Rekognition({region: "us-east-1"});
    $.getJSON("/static/data/faces.json", function(json) {
        thumbnail(Object.keys(json).map(function(face){ return json[face]; }));
        $('a.thumbnail').click(function(e){
            e.preventDefault();
            var face = json[$(this).data('id')];
            $('#myModal .modal-body img').attr('src', 'https://s3.amazonaws.com/icofaces/' + face.id + '.jpg');
            if (face.url) {
                $('#myModal .modal-body h3').html('<a href="' + face.url + '" target="_blank">' + face.name + '</a>');
            } else {
                $('#myModal .modal-body h3').text(face.name);
            }
            $('#myModal .modal-body p').html(face.role + ' of <b><a href="' + face.site + '" target="_blank">' + face.project + '</a></b>');
            $('#myModal #similar').data('face', face.face);
            $('#myModal').modal();
            return false;
        });
        $('#myModal #similar').click(function(){
            $('#myModal').modal('hide');
            console.log('search by', $(this).data('face'));
            rekognition.searchFaces({
                CollectionId: "icofaces",
                FaceId: $(this).data('face'),
                FaceMatchThreshold: 70,
                MaxFaces: 10
            }, function(err, data) {
                if(err) return alert('Error');
                if(data && data.FaceMatches) {
                    thumbnail(data.FaceMatches.map(function(face){
                        return json[face.Face.ExternalImageId];
                    }));
                }
            });
        });
        $(document).on('change', '#searchphoto', function() {
            var file = document.getElementById('searchphoto').files[0];
            s3.upload({
                Bucket: 'icosearch',
                Key: file.name,
                Body: file,
                ACL: 'public-read'
            }, function(err, data) {
                if(err) return alert('Error');
                rekognition.searchFacesByImage({
                    CollectionId: "icofaces",
                    FaceMatchThreshold: 70,
                    MaxFaces: 10,
                    Image: {
                        S3Object: {
                            Bucket: data.Bucket,
                            Name: data.Key
                        }
                    }
                }, function(err, data) {
                    if(err) return alert('Error');
                    if(data && data.FaceMatches) {
                        thumbnail(data.FaceMatches.map(function(face){
                            return json[face.Face.ExternalImageId];
                        }));
                    }
                });
            });
        });
    });
    function thumbnail(faces){
        if (!faces.length) {
            return $('#faces').html('<h3 align="center">Not found any similar faces</h2>');
        }
        $('#faces').html('');
        faces.forEach(function(face) {
            $('#faces').append('<div class="col-xs-6 col-md-3"><a href="#" data-id="'
            + face.id + '" class="thumbnail card"><img class="" src="https://s3.amazonaws.com/icofaces/'
            + face.id + '.jpg" alt="' + face.name + '"></a></div>');
        });
    }
  }
}
</script>


<style lang="sass">
.form-inline
  margin: 0 auto
.col-xs-6
  text-align: center
  margin-bottom: 30px
.thumbnail
  display: block !important
  z-index: 1500
  &:hover
    border-color: #0275d8
    cursor: pointer
  img
    height: 180px
    max-width: 171px
.btn-file
  position: relative
  overflow: hidden
.btn-file input[type=file]
  position: absolute
  top: 0
  right: 0
  min-width: 100%
  min-height: 100%
  font-size: 100px
  text-align: right
  filter: alpha(opacity=0)
  opacity: 0
  outline: none
  background: white
  cursor: inherit
  display: block
  z-index: 1500
  cursor: pointer
</style>
