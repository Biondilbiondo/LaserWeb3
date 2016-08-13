var toolpathsInScene = [];

function initTree() {
  $('#filetree').on('keyup change','input', function() {
    var inputVal = $(this).val();
    var newval = parseFloat(inputVal, 3)
    var id = $(this).attr('id');
    var objectseq = $(this).attr('objectseq');
    // console.log('Value for ' +id+ ' changed to ' +newval+ ' for object ' +objectseq );
    if ( id.indexOf('xoffset') == 0 ) {
      objectsInScene[objectseq].position.x = objectsInScene[objectseq].userData.offsetX + newval;
      // console.log('Moving ' +objectsInScene[objectseq].name+ ' to X: '+newval);
      attachBB(objectsInScene[objectseq]);
    } else if ( id.indexOf('yoffset') == 0 ) {
      objectsInScene[objectseq].position.y = objectsInScene[objectseq].userData.offsetY + newval;
      // console.log('Moving ' +objectsInScene[objectseq].name+ ' to Y: '+newval);
      attachBB(objectsInScene[objectseq]);
    } else if ( id.indexOf('rasterDPI') == 0 ) {
      var bboxpre = new THREE.Box3().setFromObject(objectsInScene[objectseq]);
      // console.log('bbox for BEFORE SCALE: Min X: ', (bboxpre.min.x + (laserxmax / 2)), '  Max X:', (bboxpre.max.x + (laserxmax / 2)), 'Min Y: ', (bboxpre.min.y + (laserymax / 2)), '  Max Y:', (bboxpre.max.y + (laserymax / 2)));
      // console.log('Scaling ' +objectsInScene[objectseq].name+ ' to: '+scale);
      var scale = (25.4 / newval);
      objectsInScene[objectseq].scale.x = scale;
      objectsInScene[objectseq].scale.y = scale;
      objectsInScene[objectseq].scale.z = scale;
      putFileObjectAtZero(objectsInScene[objectseq]);
      attachBB(objectsInScene[objectseq]);
      $("#rasterxoffset"+objectseq).val('0')
      $("#rasteryoffset"+objectseq).val('0')
    } else if ( id.indexOf('svgresol') == 0 ) {
      var svgscale = (25.4 / newval );
      objectsInScene[objectseq].scale.x = svgscale;
      objectsInScene[objectseq].scale.y = svgscale;
      objectsInScene[objectseq].scale.z = svgscale;
      putFileObjectAtZero(objectsInScene[objectseq]);
      attachBB(objectsInScene[objectseq]);
    }
  });

  $('#statusBody2').on('keyup change','input', function() {
    var inputVal = $(this).val();
    var newval = parseFloat(inputVal, 3)
    var id = $(this).attr('id');
    var objectseq = $(this).attr('objectseq');
    console.log('Value for ' +id+ ' changed to ' +newval+ ' for object ' +objectseq );
    if ( id.indexOf('tzstep') == 0 ) {
      var numPass = Math.floor((parseFloat($('#tzdepth'+objectseq).val()) / parseFloat(newval)))

      if ((parseFloat($('#tzdepth'+objectseq).val()) / parseFloat(newval)) - Math.floor(parseFloat($('#tzdepth'+objectseq).val()) / parseFloat(newval)) != 0) {
        var finalPass = parseFloat($('#tzdepth'+objectseq).val()) - (newval * numPass);
        $('#svgZDepth').text( numPass + ' x ' + newval + 'mm + 1 x ' + finalPass + 'mm');
      } else {
        $('#svgZDepth').text( numPass + ' x ' + newval + 'mm');
      }
      updateCamUserData(objectseq);
    } else if ( id.indexOf('tzdepth') == 0 ) {
      $('#svgZFinal').text(newval + 'mm');
      var numPass = Math.floor((parseFloat(newval) / parseFloat($('#tzstep'+objectseq).val())))
      if ((parseFloat(newval) / parseFloat($('#tzstep'+objectseq).val())) - Math.floor(parseFloat(newval) / parseFloat($('#tzstep'+objectseq).val())) != 0) {
        var finalPass = parseFloat(newval) - ($('#tzstep'+objectseq).val() * numPass);
        $('#svgZDepth').text( numPass + ' x ' + $('#tzstep'+objectseq).val() + 'mm + 1 x ' + finalPass + 'mm');
      } else {
        $('#svgZDepth').text( numPass + ' x ' + $('#tzstep'+objectseq).val() + 'mm');
      }
      updateCamUserData(objectseq);
    } else if ( id.indexOf('tspeed') == 0 ) {
      updateCamUserData(objectseq);
    } else if ( id.indexOf('tplungespeed') == 0 ) {
      updateCamUserData(objectseq);
    } else if ( id.indexOf('ttooldia') == 0 ) {
      $('#svgToolDia').text(newval + 'mm');
      updateCamUserData(objectseq);
    } else if ( id.indexOf('tclearanceHeight') == 0 ) {
      $('#svgZClear-8').text(newval + 'mm');
      updateCamUserData(objectseq);
    } else if ( id.indexOf('tdragoffset') == 0 ) {
      $('#dragKnifeRadius').text(newval + 'mm');
      updateCamUserData(objectseq);
    } else if ( id.indexOf('tspotsize') == 0 ) {
      $('#svgToolDia-4').text(newval + 'mm');
      updateCamUserData(objectseq);
    } else if ( id.indexOf('tvbitangle') == 0 ) {
      $('#svgVbitAngle').text(newval + 'deg');
      updateCamUserData(objectseq);
    } else if ( id.indexOf('tvbitdia') == 0 ) {
      $('#svgVbitDia').text(newval + 'mm');
      updateCamUserData(objectseq);
    } else if ( id.indexOf('tvbitheight') == 0 ) {
      $('#svgVbitHeight').text(newval + 'mm');
      updateCamUserData(objectseq);
    }

    if ( id.indexOf('tminpwr') == 0 ) {
      updateRasterUserData(objectseq);
    } else if ( id.indexOf('tmaxpwr') == 0 ) {
      updateRasterUserData(objectseq);
    } else if ( id.indexOf('tfeedRateW') == 0 ) {
      updateRasterUserData(objectseq);
    } else if ( id.indexOf('tfeedRateB') == 0 ) {
      updateRasterUserData(objectseq);
    }


  });

  $('#statusBody2').on('keyup change','select', function() {
    var newval = $(this).val();
    var id = $(this).attr('id');
    var objectseq = $(this).attr('objectseq');
    console.log('Value for ' +id+ ' changed to ' +newval+ ' for object ' +objectseq );
    if ( id.indexOf('toperation') == 0 ) {
      if (newval == "Laser: Vector (no path offset)") {
        laserMode();
        updateCamUserData(objectseq);
      } else if (newval == "Laser: Vector (no path offset)") {
        laserMode();
        updateCamUserData(objectseq);
      } else if (newval == "Laser: Vector (path inside)") {
        laserInsideMode();
        updateCamUserData(objectseq);
      } else if (newval == "Laser: Vector (path outside)") {
        laserOutsideMode();
        updateCamUserData(objectseq);
      } else if (newval == "CNC: Outside") {
        cncOutsideMode();
        updateCamUserData(objectseq);
      } else if (newval == "CNC: Inside") {
        cncInsideMode();
        updateCamUserData(objectseq);
      } else if (newval == "CNC: Pocket") {
        cncPocketMode();
        updateCamUserData(objectseq);
      } else if (newval == "CNC: V-Engrave") {
        cncVEngMode();
        updateCamUserData(objectseq);
      } else if (newval == "Drag Knife: Cutout") {
        dragKnifeMode();
        updateCamUserData(objectseq);
      }
    };

    if ( id.indexOf('roperation') == 0 ) {
      if (newval == "Laser: Engrave") {
        laserRasterMode();
        updateRasterUserData(objectseq);
      } else if (newval == "CNC: V Peck") {
        cncVRasterMode();
        updateRasterUserData(objectseq);
      }
    };
  });

  // Fill it up as empty
  fillTree()

}

function updateCamUserData(i) {
  toolpathsInScene[i].userData.camOperation = $('#toperation'+i).val();
  toolpathsInScene[i].userData.camToolDia = $('#ttooldia'+i).val();
  toolpathsInScene[i].userData.camZClearance = $('#tclearanceHeight'+i).val();
  toolpathsInScene[i].userData.camDragOffset = $('#tdragoffset'+i).val();
  toolpathsInScene[i].userData.camLaserPower = $('#tpwr'+i).val();
  toolpathsInScene[i].userData.camZStep = $('#tzstep'+i).val();
  toolpathsInScene[i].userData.camZDepth = $('#tzdepth'+i).val();
  toolpathsInScene[i].userData.camFeedrate = $('#tspeed'+i).val();
  toolpathsInScene[i].userData.camPlungerate = $('#tplungespeed'+i).val();
  toolpathsInScene[i].userData.camVAngle = $('#tvbitangle'+i).val();
  toolpathsInScene[i].userData.camVHeight = $('#tvbitheight'+i).val();
  toolpathsInScene[i].userData.camVDia = $('#tvbitdia'+i).val();
};

function updateRasterUserData(i) {
  toolpathsInScene[i].userData.camOperation = $('#roperation'+i).val();
  toolpathsInScene[i].userData.rasterMinPwr = $('#tminpwr'+i).val();
  toolpathsInScene[i].userData.rasterMaxPwr = $('#tmaxpwr'+i).val();
  toolpathsInScene[i].userData.rasterBlackFeedrate = $('#tfeedRateB'+i).val();
  toolpathsInScene[i].userData.rasterWhiteFeedrate = $('#tfeedRateW'+i).val();
  toolpathsInScene[i].userData.camVAngle = $('#tvbitangle'+i).val();
  toolpathsInScene[i].userData.camVHeight = $('#tvbitheight'+i).val();
  toolpathsInScene[i].userData.camVDia = $('#tvbitdia'+i).val();
  toolpathsInScene[i].userData.camFeedrate = $('#tspeed'+i).val();
  toolpathsInScene[i].userData.camPlungerate = $('#tplungespeed'+i).val();

};

function fillTree() {
  $('#filetreeheader').empty();
  $('#filetree').empty();
  $('#toolpathtreeheader').empty();
  $('#toolpathtree').empty();

  var header = `
  <table style="width: 100%">
    <tr class="jobsetupfile">
      <td>
        <label for="filetreetable">Objects</label>
      </td>
      <td>
        <a class="btn btn-xs btn-success disabled" onclick="addJob();" id="tpaddpath"><i class="fa fa-plus" aria-hidden="true"></i> Add selection to Job</a>
      </td>
    </tr>
  </table>
  `

  $('#filetreeheader').append(header);

  if (objectsInScene.length > 0) {

    $('#tpaddpath').removeClass('disabled');

    var table = `<table class="jobsetuptable" style="width: 100%" id="filetreetable">`
    $('#filetree').append(table);


    for (i = 0; i < objectsInScene.length; i++) {

      var xoffset = objectsInScene[i].userData.offsetX.toFixed(1);
      var yoffset = objectsInScene[i].userData.offsetY.toFixed(1);
      var xpos = objectsInScene[i].position.x.toFixed(1);
      var ypos = objectsInScene[i].position.y.toFixed(1);
      var scale = objectsInScene[i].scale.y;
      if (objectsInScene[i].name.indexOf('.svg') != -1) {
        var svgscale = objectsInScene[i].scale.x
      }

      if (objectsInScene[i].type != "Mesh") {
        var file = `
        <tr class="jobsetupfile topborder">
          <td>
            <i class="fa fa-fw fa-file-text-o" aria-hidden="true"></i>&nbsp;
            <a class="entity" href="#" onclick="attachBB(objectsInScene[`+i+`]);"><b>` + objectsInScene[i].name + `</b></a>
          </td>
          <td id="buttons`+i+`">
            <a class="btn btn-xs btn-primary" onclick="$('#move`+i+`').toggle(); $(this).toggleClass('active');"><i class="fa fa-arrows" aria-hidden="true"></i></a>
            <a class="btn btn-xs btn-danger" onclick="objectsInScene.splice('`+i+`', 1); fillTree(); fillLayerTabs();"><i class="fa fa-times" aria-hidden="true"></i></a>
          </td>
          <td>
            <input type="checkbox" value="" onclick=" $('.chkchildof`+i+`').prop('checked', $(this).prop('checked'));" id="selectall`+i+`" />
          </td>
        </tr>
        <tr class="jobsetupfile" id="move`+i+`" style="display: none;">
          <td colspan="3">
            <label >Position Offset</label>
            <table><tr><td>
            <div class="input-group">
              <span class="input-group-addon input-group-addon-xs">X:</span>
              <input type="number" class="form-control input-xs" xoffset="`+xoffset+`" value="`+ -(xoffset - xpos)+`"  id="xoffset`+i+`" objectseq="`+i+`" step="1"><br>
              <span class="input-group-addon input-group-addon-xs">mm</span>
            </div></td><td>
            <div class="input-group">
              <span class="input-group-addon input-group-addon-xs">Y:</span>
              <input type="number" class="form-control input-xs" yoffset="`+yoffset+`" value="`+ -(yoffset - ypos)+`"  id="yoffset`+i+`" objectseq="`+i+`" step="1">
              <span class="input-group-addon input-group-addon-xs">mm</span>
            </div></td></tr></table>
          </td>
        </tr>
        `
      } else {
        var file = `
        <tr class="jobsetupfile topborder">
          <td>
            <i class="fa fa-fw fa-file-photo-o" aria-hidden="true"></i>&nbsp;
            <a class="entity" href="#" onclick="attachBB(objectsInScene[`+i+`]);"><b>` + objectsInScene[i].name + `</b></a>
          </td>
          <td>
            <a class="btn btn-xs btn-warning" onclick="tracebmp(`+i+`, '`+objectsInScene[i].name+`')"><i class="fa fa-scissors" aria-hidden="true"></i></a>
            <a class="btn btn-xs btn-primary" onclick="$('#scale`+i+`').toggle(); $(this).toggleClass('active');"><i class="fa fa-expand" aria-hidden="true"></i></a>
            <a class="btn btn-xs btn-primary" onclick="$('#move`+i+`').toggle(); $(this).toggleClass('active');"><i class="fa fa-arrows" aria-hidden="true"></i></a>
            <a class="btn btn-xs btn-danger"  onclick="objectsInScene.splice('`+i+`', 1); fillTree(); fillLayerTabs();"><i class="fa fa-times" aria-hidden="true"></i></a>
          </td>
          <td>
            <input type="checkbox" value="" class="chkaddjob" id="child.`+i+`" />
          </td>
        </tr>
        <tr class="jobsetupfile" id="move`+i+`" style="display: none;">
          <td colspan="3">
            <label >Position Offset</label>
            <table><tr><td>
            <div class="input-group">
              <span class="input-group-addon input-group-addon-xs">X:</span>
              <input type="number" class="form-control input-xs" xoffset="`+xoffset+`" value="`+ -(xoffset - xpos)+`"  id="rasterxoffset`+i+`" objectseq="`+i+`" step="1"><br>
              <span class="input-group-addon input-group-addon-xs">mm</span>
            </div></td><td>
            <div class="input-group">
              <span class="input-group-addon input-group-addon-xs">Y:</span>
              <input type="number" class="form-control input-xs" yoffset="`+yoffset+`" value="`+ -(yoffset - ypos)+`"  id="rasteryoffset`+i+`" objectseq="`+i+`" step="1">
              <span class="input-group-addon input-group-addon-xs">mm</span>
            </div></td></tr></table>
          </td>
        </tr>
        <tr class="jobsetupfile" id="scale`+i+`" style="display: none;">
          <td colspan="3">
            <label>Bitmap Resolution</label>
            <div class="input-group">
              <input type="number" class="form-control input-xs" value="`+(25.4/scale)+`" id="rasterDPI`+i+`" objectseq="`+i+`">
              <span class="input-group-addon input-group-addon-xs">DPI</span>
            </div>
          </td>
        </tr>
        `
      }


      $('#filetreetable').append(file)

      if (svgscale) {
        var svgfile =`
        <tr class="jobsetupfile" id="scale`+i+`" style="display: none;">
          <td colspan="3">
            <label>SVG Resolution</label>
            <div class="input-group">
              <input type="number" class="form-control input-xs" value="`+(25.4/svgscale)+`" id="svgresol`+i+`" objectseq="`+i+`">
              <span class="input-group-addon input-group-addon-xs">DPI</span>
            </div>
          </td>
        </tr>`
        $('#filetreetable').append(svgfile)

        var scalebtn = `<a class="btn btn-xs btn-primary" onclick="$('#scale`+i+`').toggle(); $(this).toggleClass('active');"><i class="fa fa-expand" aria-hidden="true"></i></a>`
        $('#buttons'+i).prepend(scalebtn)


      }

      //  var name = objectsInScene[i].name;
       for (j = 0; j < objectsInScene[i].children.length; j++) {

         var child = `
         <tr class="jobsetupchild children`+i+`">
           <td>
            <i class="fa fa-fw fa-sm fa-object-ungroup" aria-hidden="true"></i>&nbsp;
            <a class="entity" href="#" onclick="attachBB(objectsInScene[`+i+`].children[`+j+`])" id="link`+i+`_`+j+`">`+objectsInScene[i].children[j].name+`</a>
          </td>
          <td>
            <a class="btn btn-xs btn-danger" onclick="objectsInScene[`+i+`].remove(objectsInScene[`+i+`].children[`+j+`]); fillTree();"><i class="fa fa-times" aria-hidden="true"></i></a>
          </td>
          <td>
            <input type="checkbox" value="" class="chkaddjob chkchildof`+i+`" id="child.`+i+`.`+j+`" />
          </td>
         </tr>
         `
         $('#filetreetable').append(child)
        //  var name = objectsInScene[i].children[j].name;
        objectsInScene[i].children[j].userData.link = "link"+i+"_"+j
       }
    }
    var tableend = `
    </table>
    `
    $('#filetree').append(tableend)
  } else {
    var instructions = `Please open a file from the <kbd>Open</kbd> button...`
    $('#filetree').append(instructions)

  }// End of if (objectsInScene.length > 0)

  var toolpatheader = `
  <table style="width: 100%">
    <tr class="jobsetupfile">
      <td>
        <label for="toolpathstable">Toolpaths</label>
      </td>
      <td>
        <a class="btn btn-xs btn-success disabled" id="generatetpgcode"><i class="fa fa-cubes" aria-hidden="true"></i> Generate G-Code</a>
      </td>
    </tr>
  </table>`
  $('#toolpathtreeheader').append(toolpatheader)

  if (toolpathsInScene.length > 0) {

    $('#generatetpgcode').removeClass('disabled');

    var table = `<table class="jobsetuptable" style="width: 100%" id="toolpathstable">`

    $('#toolpathtree').append(table)
    for (i = 0; i < toolpathsInScene.length; i++) {
      if (toolpathsInScene[i].type != "Mesh") {
        var toolp = `<tr class="jobsetupfile">
          <td>
            <i class="fa fa-fw fa-object-group" aria-hidden="true"></i>&nbsp;
            <a class="entity-job" href="#">`+toolpathsInScene[i].name+`</a>
          </td>
          <td>

          </td>
          <td>
            <a class="btn btn-xs btn-default" onclick="viewToolpath('`+i+`', 1);"><i class="fa fa-eye" aria-hidden="true"></i></a>
            <a class="btn btn-xs btn-danger" onclick="toolpathsInScene.splice('`+i+`', 1); fillTree(); fillLayerTabs();"><i class="fa fa-times" aria-hidden="true"></i></a>
            <a class="btn btn-xs btn-primary" onclick="setupJob(`+i+`);"><i class="fa fa-fw fa-sliders" aria-hidden="true"></i></a>
          </td>
        </tr>
        `
      } else {
        var toolp = `<tr class="jobsetupfile">
          <td>
            <i class="fa fa-fw fa-picture-o" aria-hidden="true"></i>&nbsp;
            <a class="entity-job" href="#">`+toolpathsInScene[i].name+`</a>
          </td>
          <td>

          </td>
          <td>
            <a class="btn btn-xs btn-default" onclick="viewToolpath('`+i+`', 1);"><i class="fa fa-eye" aria-hidden="true"></i></a>
            <a class="btn btn-xs btn-danger"  onclick="toolpathsInScene.splice('`+i+`', 1); fillTree(); fillLayerTabs();"><i class="fa fa-times" aria-hidden="true"></i></a>
            <a class="btn btn-xs btn-primary" onclick="setupRaster(`+i+`);"><i class="fa fa-fw fa-sliders" aria-hidden="true"></i></a>
          </td>
        </tr>
        `
      }

      $('#toolpathstable').append(toolp);
    }

  } else {
    var instructions = `Please select some entities from the <b>Objects</b> above and add them to a toolpath using the <br><kbd><i class="fa fa-plus" aria-hidden="true"></i> Add selection to Job</kbd> button...`
    $('#toolpathtree').append(instructions)

  }  // End of if (toolpathsInScene.length > 0)
  var tableend = `
  </table>
  `
  $('#toolpathstable').append(tableend)
}



function addJob() {
  var toolpath = new THREE.Group();
  $(".chkaddjob").each(function(){

    resetColors() // Set all colors back to original

      var $this = $(this);

      if($this.is(":checked")){
          // console.log($this.attr("id"));
          var id = $this.attr("id");
          var id = id.split(".");
          if (id[2]) {
            var child = objectsInScene[id[1]].children[id[2]];
            var copy = child.clone()
            copy.translateX( child.parent.position.x );
            copy.translateY( child.parent.position.y );
            toolpath.add(copy);
          } else {
            var child = objectsInScene[id[1]];
            var copy = child.clone()
            copy.translateX( child.parent.position.x );
            copy.translateY( child.parent.position.y );
            toolpathsInScene.push(copy)
          }
      }else{
          // console.log($this.attr("id")) // Is not ticked

      }
  });
  if (toolpath.children.length > 0) {
    toolpath.name = "Vector-"+(toolpathsInScene.length)
    toolpathsInScene.push(toolpath)
  }
  fillTree();
}

function viewToolpath(i) {
  clearScene()
  $(".layertab").removeClass('active');
  $('#jobView').addClass('active');
  clearScene()
  scene.add(toolpathsInScene[i]);
  var tpath = toolpathsInScene[i];
  makeRed(tpath);
  if (toolpathsInScene[i].userData) {
    if (toolpathsInScene[i].userData.inflated) {
      scene.add(toolpathsInScene[i].userData.inflated);
      toolpathsInScene[i].userData.inflated.translateX(toolpathsInScene[i].parent.position.x)
      toolpathsInScene[i].userData.inflated.translateY(toolpathsInScene[i].parent.position.y)
    }
  };
  if (typeof(boundingBox) != 'undefined') {
      scene.remove(boundingBox);
  }
}

function clearScene() {
  var total = scene.children.length
  for (var x = 6; x < total; x++) {
    // console.log('Removing ' + scene.children[x].name + ' from scene')
    scene.remove(scene.children[x]);
  }
  var total = scene.children.length
  for (var x = 6; x < total; x++) {
    // console.log('Removing ' + scene.children[x].name + ' from scene')
    scene.remove(scene.children[x]);
  }
}

function resetColors() {
  for (i = 0; i < objectsInScene.length; i++) {
    for (j = 0; j < objectsInScene[i].children.length; j++) {
      objectsInScene[i].children[j].material.color.setHex(objectsInScene[i].children[j].userData.color);
    }
  }
}

function makeRed(tpath) {
  tpath.traverse( function ( child ) {
    if (child.type == "Line") {
      child.material.color.setRGB(1, 0.1, 0.1);
    }
  });
}

function setupJob(toolpathid) {
  $('#statusmodal').modal('show');
  $('#statusTitle').empty();
  $('#statusTitle').html('Configure Toolpath');
  $('#statusBody').empty();
  $('#statusBody2').empty();

  $('#statusBody').html('<br>Configure the operation for the toolpath <b>' + toolpathsInScene[toolpathid].name + '</b><hr>' );
  var template2 = `
  <div class="form-group">
    <label>Operation</label>
      <div class="input-group" >
        <span class="input-group-addon">Type of cut: </span>
        <select class="form-control" id="toperation`+toolpathid+`" objectseq="`+toolpathid+`">
          <option>Laser: Vector (no path offset)</option>
          <option>Laser: Vector (path inside)</option>
          <option>Laser: Vector (path outside)</option>
          <option>CNC: Inside</option>
          <option>CNC: Outside</option>
          <option>CNC: Pocket</option>
          <option>CNC: V-Engrave</option>
          <option>Drag Knife: Cutout</option>
        </select>
      </div>
    </div>

    <div class="form-group">
      <label class="control-label">Tool Options</label>

      <div class="input-group inputcnc">
        <span class="input-group-addon">Endmill Diameter</span>
        <input type="number" class="form-control input-sm" value="6.35" id="ttooldia`+toolpathid+`"  objectseq="`+toolpathid+`" min="0">
        <span class="input-group-addon">mm</span>
      </div>

      <div class="input-group inputcnc inputvbit">
        <span class="input-group-addon">Z Safe Height</span>
        <input type="number" class="form-control input-sm" value="10" id="tclearanceHeight`+toolpathid+`"  objectseq="`+toolpathid+`" min="1">
        <span class="input-group-addon">mm</span>
      </div>

      <div class="input-group inputdragknife">
        <span class="input-group-addon">Drag Knife: Center Offset</span>
        <input type="number" class="form-control input-sm" value="0.1" id="tdragoffset`+toolpathid+`"  objectseq="`+toolpathid+`" step="0.1" min="0">
        <span class="input-group-addon">mm</span>
      </div>


      <div class="input-group inputvbit">
        <span class="input-group-addon">V Bit: Diameter</span>
        <input type="number" class="form-control input-sm" value="10" id="tvbitdia`+toolpathid+`"  objectseq="`+toolpathid+`" min="0">
        <span class="input-group-addon">mm</span>
      </div>

      <div class="input-group inputvbit">
        <span class="input-group-addon">V Bit: Height</span>
        <input type="number" class="form-control input-sm" value="10" id="tvbitheight`+toolpathid+`"  objectseq="`+toolpathid+`" min="0">
        <span class="input-group-addon">mm</span>
      </div>

      <div class="input-group inputvbit">
        <span class="input-group-addon">V Bit: V Angle</span>
        <input type="number" class="form-control input-sm" value="90" id="tvbitangle`+toolpathid+`"  objectseq="`+toolpathid+`" min="0">
        <span class="input-group-addon">deg</span>
      </div>

      <div class="input-group inputlaser">
        <span class="input-group-addon">Laser: Power</span>
        <input type="number" class="form-control" value="100" id="tpwr`+toolpathid+`" objectseq="`+toolpathid+`" min="1" max="100">
        <span class="input-group-addon">%</span>
      </div>

      <div class="input-group inputlaser">
        <span class="input-group-addon">Laser: Diameter</span>
        <input type="number" class="form-control" value="0.1" id="tspotsize`+toolpathid+`" objectseq="`+toolpathid+`" min="0.1" max="5" step="0.1">
        <span class="input-group-addon">mm</span>
      </div>


    </div>

    <div class="form-group inputcnc inputlaser">
      <label>Operation Depth</label>

      <div class="input-group inputcnc inputlaser">
        <span class="input-group-addon">Cut Depth per pass</span>
        <input type="number" class="form-control" id="tzstep`+toolpathid+`" value="5" objectseq="`+toolpathid+`" min="0" step="1">
        <span class="input-group-addon">mm</span>
      </div>

      <div class="input-group inputcnc inputlaser">
        <span class="input-group-addon">Cut Depth Final</span>
        <input type="number" class="form-control" id="tzdepth`+toolpathid+`" value="25" objectseq="`+toolpathid+`" min="0" step="1">
        <span class="input-group-addon">mm</span>
      </div>

    </div>


    <div class="form-group">
      <label>Feedrate</label>

      <div class="input-group">
        <span class="input-group-addon">Feedrate: Cut</span>
        <input type="number" class="form-control" value="6" id="tspeed`+toolpathid+`" objectseq="`+toolpathid+`" min="0" step="1" >
        <span class="input-group-addon">mm/s</span>
      </div>

      <div class="input-group inputcnc">
        <span class="input-group-addon">Feedrate: Plunge</span>
        <input type="number" class="form-control" value="2" id="tplungespeed`+toolpathid+`" objectseq="`+toolpathid+`" min="0" step="1">
        <span class="input-group-addon">mm/s</span>
      </div>
    </div>


  <button type="button" class="btn btn-lg btn-success" data-dismiss="modal">Preview Toolpath </button>
  `
  $('#statusBody2').html(template2);
  $('#statusBody').prepend(svgcnctool);

laserMode(); // Default to laser since the Select defaults to laser.  In near future I want to update this to keep last user Operation in localstorage and default to last used on when opening modal

}


function setupRaster(toolpathid) {
  $('#statusmodal').modal('show');
  $('#statusTitle').empty();
  $('#statusTitle').html('Configure Toolpath');
  $('#statusBody').empty();
  $('#statusBody2').empty();

  $('#statusBody').html('<br>Configure the operation for the toolpath <b>' + toolpathsInScene[toolpathid].name + '</b><hr>' );
  var template2 = `
  <div class="form-group">
    <label>Operation</label>
      <div class="input-group" >
        <span class="input-group-addon">Type of raster: </span>
        <select class="form-control" id="roperation`+toolpathid+`" objectseq="`+toolpathid+`">
          <option>Laser: Engrave</option>
          <option>CNC: V Peck</option>
        </select>
      </div>
    </div>

  <div class="form-group">
    <label >Tool Options</label>
    <div class="input-group inputraster">
      <span class="input-group-addon">Laser: Diameter</span>
      <input type="number" class="form-control" value="0.1" id="tspotsize`+toolpathid+`" objectseq="`+toolpathid+`" min="0.1" max="5" step="0.1">
      <span class="input-group-addon">mm</span>
    </div>

    <div class="input-group inputvbit">
      <span class="input-group-addon">V Bit: Diameter</span>
      <input type="number" class="form-control input-sm" value="10" id="tvbitdia`+toolpathid+`"  objectseq="`+toolpathid+`" min="0">
      <span class="input-group-addon">mm</span>
    </div>

    <div class="input-group inputvbit">
      <span class="input-group-addon">V Bit: Height</span>
      <input type="number" class="form-control input-sm" value="10" id="tvbitheight`+toolpathid+`"  objectseq="`+toolpathid+`" min="0">
      <span class="input-group-addon">mm</span>
    </div>

    <div class="input-group inputvbit">
      <span class="input-group-addon">V Bit: V Angle</span>
      <input type="number" class="form-control input-sm" value="90" id="tvbitangle`+toolpathid+`"  objectseq="`+toolpathid+`" min="0">
      <span class="input-group-addon">deg</span>
    </div>

  </div>

  <div class="form-group inputraster" >
    <label >Raster: Proportional Feedrate</label>
    <div class="input-group">
      <span class="input-group-addon">Light</span>
      <input type="number" class="form-control input-sm"  value="20" id="tfeedRateW`+toolpathid+`" objectseq="`+toolpathid+`">
      <span class="input-group-addon">mm/s</span>
    </div>
    <div class="input-group">
      <span class="input-group-addon">Dark</span>
      <input type="number" class="form-control input-sm"  value="20" id="tfeedRateB`+toolpathid+`" objectseq="`+toolpathid+`">
      <span class="input-group-addon">mm/s</span>
    </div>
  </div>

  <div class="form-group inputraster">
    <label>Laser Power Constraints</label>
    <div class="input-group">
      <span class="input-group-addon">Min</span>
      <input type="number"  min="0" max="100" class="form-control input-sm" value="0" id="tminpwr`+toolpathid+`" objectseq="`+toolpathid+`">
      <span class="input-group-addon">%</span>
    </div>
    <div class="input-group">
      <span class="input-group-addon">Max</span>
      <input type="number"  min="0" max="100" class="form-control input-sm" value="100" id="tmaxpwr`+toolpathid+`" objectseq="`+toolpathid+`">
      <span class="input-group-addon">%</span>
    </div>
  </div>

  <div class="form-group inputvbit">
    <label>Feedrate</label>

    <div class="input-group">
      <span class="input-group-addon">Feedrate: Cut</span>
      <input type="number" class="form-control" value="6" id="tspeed`+toolpathid+`" objectseq="`+toolpathid+`" min="0" step="1" >
      <span class="input-group-addon">mm/s</span>
    </div>

    <div class="input-group">
      <span class="input-group-addon">Feedrate: Plunge</span>
      <input type="number" class="form-control" value="2" id="tplungespeed`+toolpathid+`" objectseq="`+toolpathid+`" min="0" step="1">
      <span class="input-group-addon">mm/s</span>
    </div>
  </div>

  <button type="button" class="btn btn-lg btn-success" data-dismiss="modal">Save Parameters </button>
  `
  $('#statusBody2').html(template2);
  $('#statusBody').prepend(svgcnctool);
  laserRasterMode();
}


function laserMode() {
  $('#svgLaserGrp').show()
  $('#svgCNCFlatBit').hide()
  $('#svgCNCVbit').hide()
  $('#svgKnifeGrp').hide()
  $('#svgKnifeView').hide()
  $('#svgRasterPeck').hide()

  $('#svgOutside').hide()
  $('#svgInside').hide()
  $('#svgPocket').hide()
  $('#svgToolpath').show();
  $('#svgLaserRasterToolpath').hide()

  $('#svgZGrp').show();
  $('#svgzmulti').show();
  $('#svgzClearance').hide();

  $('.inputcnc').hide();
  $('.inputlaser').show();
  $('.inputdragknife').hide();
  $('.inputvbit').hide();
  $('#svgOpName').text("Laser");
};

function laserRasterMode() {
  $('#svgLaserGrp').show()
  $('#svgCNCFlatBit').hide()
  $('#svgCNCVbit').hide()
  $('#svgKnifeGrp').hide()
  $('#svgKnifeView').hide()
  $('#svgRasterPeck').show()

  $('#svgOutside').hide()
  $('#svgInside').hide()
  $('#svgPocket').hide()
  $('#svgToolpath').hide();

  $('#svgZGrp').hide();
  $('#svgzmulti').hide();
  $('#svgzClearance').hide();

  $('.inputcnc').hide();
  $('.inputlaser').hide();
  $('.inputdragknife').hide();
  $('.inputvbit').hide();
  $('.inputraster').show();
  $('#svgOpName').text("Laser Raster");
  $('#svgLaserRasterToolpath').show()
};


function laserInsideMode() {
  $('#svgLaserGrp').show()
  $('#svgCNCFlatBit').hide()
  $('#svgCNCVbit').hide()
  $('#svgKnifeGrp').hide()
  $('#svgKnifeView').hide()
  $('#svgRasterPeck').hide()

  $('#svgOutside').hide()
  $('#svgInside').show()
  $('#svgPocket').hide()
  $('#svgToolpath').show();
  $('#svgLaserRasterToolpath').hide()

  $('#svgZGrp').show();
  $('#svgzmulti').show();
  $('#svgzClearance').hide();

  $('.inputcnc').hide();
  $('.inputlaser').show();
  $('.inputdragknife').hide();
  $('.inputvbit').hide();  $('#svgOpName').text("Inside");
};

function laserOutsideMode() {
  $('#svgLaserGrp').show()
  $('#svgCNCFlatBit').hide()
  $('#svgCNCVbit').hide()
  $('#svgKnifeGrp').hide()
  $('#svgKnifeView').hide()
  $('#svgRasterPeck').hide()

  $('#svgOutside').show()
  $('#svgInside').hide()
  $('#svgPocket').hide()
  $('#svgToolpath').show();
  $('#svgLaserRasterToolpath').hide()

  $('#svgZGrp').show();
  $('#svgzmulti').show();
  $('#svgzClearance').hide();

  $('.inputcnc').hide();
  $('.inputlaser').show();
  $('.inputdragknife').hide();
  $('.inputvbit').hide();
  $('#svgOpName').text("Outside");
};

function cncInsideMode() {
  $('#svgLaserGrp').hide()
  $('#svgCNCFlatBit').show()
  $('#svgCNCVbit').hide()
  $('#svgKnifeGrp').hide()
  $('#svgKnifeView').hide()
  $('#svgRasterPeck').hide()

  $('#svgOutside').hide()
  $('#svgInside').show()
  $('#svgPocket').hide()
  $('#svgToolpath').show();
  $('#svgLaserRasterToolpath').hide()

  $('#svgZGrp').show();
  $('#svgzmulti').show();
  $('#svgzClearance').show();

  $('.inputlaser').hide();
  $('.inputcnc').show();
  $('.inputdragknife').hide();
  $('.inputvbit').hide();
  $('#svgOpName').text("Inside");
};

function cncOutsideMode() {
  $('#svgLaserGrp').hide()
  $('#svgCNCFlatBit').show()
  $('#svgCNCVbit').hide()
  $('#svgKnifeGrp').hide()
  $('#svgKnifeView').hide()
  $('#svgRasterPeck').hide()

  $('#svgOutside').show()
  $('#svgInside').hide()
  $('#svgPocket').hide()
  $('#svgToolpath').show();
  $('#svgLaserRasterToolpath').hide()

  $('#svgZGrp').show();
  $('#svgzmulti').show();
  $('#svgzClearance').show();

  $('.inputlaser').hide();
  $('.inputcnc').show();
  $('.inputdragknife').hide();
  $('.inputvbit').hide();
  $('#svgOpName').text("Outside");
};

function cncPocketMode() {
  $('#svgLaserGrp').hide()
  $('#svgCNCFlatBit').show()
  $('#svgCNCVbit').hide()
  $('#svgKnifeGrp').hide()
  $('#svgKnifeView').hide()
  $('#svgRasterPeck').hide()

  $('#svgOutside').hide()
  $('#svgInside').hide()
  $('#svgPocket').show()
  $('#svgToolpath').show();
  $('#svgLaserRasterToolpath').hide()

  $('#svgZGrp').show();
  $('#svgzmulti').show();
  $('#svgzClearance').show();

  $('.inputlaser').hide();
  $('.inputcnc').show();
  $('.inputdragknife').hide();
  $('.inputvbit').hide();
  $('#svgOpName').text("Pocket");
};


function cncVEngMode() {
  $('#svgLaserGrp').hide()
  $('#svgCNCFlatBit').hide()
  $('#svgCNCVbit').show()
  $('#svgKnifeGrp').hide()
  $('#svgKnifeView').hide()
  $('#svgRasterPeck').hide()

  $('#svgOutside').hide()
  $('#svgInside').hide()
  $('#svgPocket').hide()
  $('#svgToolpath').show();
  $('#svgLaserRasterToolpath').hide()

  $('#svgZGrp').show();
  $('#svgzmulti').hide();
  $('#svgzClearance').show();

  $('.inputcnc').hide();
  $('.inputlaser').hide();
  $('.inputdragknife').hide();
  $('.inputvbit').show();
  $('#svgOpName').text("V Cutter");
};

function cncVRasterMode() {
  $('#svgLaserGrp').hide()
  $('#svgCNCFlatBit').hide()
  $('#svgCNCVbit').show()
  $('#svgKnifeGrp').hide()
  $('#svgKnifeView').hide()
  $('#svgRasterPeck').show()

  $('#svgOutside').hide()
  $('#svgInside').hide()
  $('#svgPocket').hide()
  $('#svgToolpath').hide();
  $('#svgLaserRasterToolpath').hide()

  $('#svgZGrp').hide();
  $('#svgzmulti').hide();
  $('#svgzClearance').hide();

  $('.inputcnc').hide();
  $('.inputlaser').hide();
  $('.inputdragknife').hide();
  $('.inputvbit').show();
  $('.inputraster').hide();
  $('#svgOpName').text("V Peck");
};

function dragKnifeMode() {
  $('#svgLaserGrp').hide()
  $('#svgCNCFlatBit').hide()
  $('#svgCNCVbit').hide()
  $('#svgKnifeGrp').show()
  $('#svgKnifeView').show()
  $('#svgRasterPeck').hide()

  $('#svgOutside').hide()
  $('#svgInside').hide()
  $('#svgPocket').hide()
  $('#svgToolpath').hide();
  $('#svgLaserRasterToolpath').hide()

  $('#svgZGrp').hide();
  $('#svgzmulti').hide();
  $('#svgzClearance').hide();

  $('.inputcnc').hide();
  $('.inputlaser').hide();
  $('.inputdragknife').show();
  $('.inputvbit').hide();
  $('#svgOpName').text("Drag Knife");
};

var svgcnctool = `
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg
   xmlns:dc="http://purl.org/dc/elements/1.1/"
   xmlns:cc="http://creativecommons.org/ns#"
   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
   xmlns:svg="http://www.w3.org/2000/svg"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
   version="1.1"
   id="svg4163"
   viewBox="0 0 446.4567 141.73229"
   height="40mm"
   width="126mm"
   inkscape:version="0.91 r13725"
   sodipodi:docname="cnctoolpath.svg">
  <sodipodi:namedview
     pagecolor="#ffffff"
     bordercolor="#666666"
     borderopacity="1"
     objecttolerance="10"
     gridtolerance="10"
     guidetolerance="10"
     inkscape:pageopacity="0"
     inkscape:pageshadow="2"
     inkscape:window-width="1920"
     inkscape:window-height="1017"
     id="namedview61"
     showgrid="false"
     inkscape:zoom="4"
     inkscape:cx="69.858429"
     inkscape:cy="127.38938"
     inkscape:window-x="1912"
     inkscape:window-y="-8"
     inkscape:window-maximized="1"
     inkscape:current-layer="svgLaserGrp" />
  <defs
     id="defs4165">
    <marker
       refY="0"
       refX="0"
       style="overflow:visible"
       id="DistanceX"
       orient="auto">
      <path
         style="stroke:#000000;stroke-width:0.5"
         d="M 3,-3 -3,3 M 0,-5 0,5"
         id="path4801"
         inkscape:connector-curvature="0" />
    </marker>
    <pattern
       height="8"
       width="8"
       patternUnits="userSpaceOnUse"
       y="0"
       x="0"
       id="Hatch">
      <path
         linecap="square"
         stroke="#000000"
         stroke-width="0.25"
         d="M8 4 l-4,4"
         id="path4804" />
      <path
         linecap="square"
         stroke="#000000"
         stroke-width="0.25"
         d="M6 2 l-4,4"
         id="path4806" />
      <path
         linecap="square"
         stroke="#000000"
         stroke-width="0.25"
         d="M4 0 l-4,4"
         id="path4808" />
    </pattern>
  </defs>
  <metadata
     id="metadata4168">
    <rdf:RDF>
      <cc:Work
         rdf:about="">
        <dc:format>image/svg+xml</dc:format>
        <dc:type
           rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
        <dc:title />
      </cc:Work>
    </rdf:RDF>
  </metadata>
  <g
     id="g4810"
     transform="translate(0,-212.59843)" />
  <text
     sodipodi:linespacing="125%"
     xml:space="preserve"
     style="font-style:normal;font-weight:normal;font-size:40px;line-height:125%;font-family:sans-serif;letter-spacing:0px;word-spacing:0px;fill:#000000;fill-opacity:1;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
     x="396.09375"
     y="-122.33018"
     id="text4893"><tspan
       id="tspan4895"
       x="396.09375"
       y="-122.33018" /></text>
  <g
     id="svgZGrp"
     transform="translate(228.3526,-110.26577)">
    <text
       id="svgZFinal"
       y="217.55241"
       x="-74.699562"
       style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:13.75px;line-height:125%;font-family:sans-serif;-inkscape-font-specification:'sans-serif, Normal';text-align:start;letter-spacing:0px;word-spacing:0px;writing-mode:lr-tb;text-anchor:start;fill:#000000;fill-opacity:1;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
       xml:space="preserve"
       sodipodi:linespacing="125%"><tspan
         style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:15px;font-family:sans-serif;-inkscape-font-specification:sans-serif"
         y="217.55241"
         x="-74.699562"
         id="tspan4913">25mm</tspan></text>
    <path
       id="path4929"
       d="m -116.53838,205.90064 12.94046,0 0,42.9047 -13.07959,0"
       style="fill:none;fill-rule:evenodd;stroke:#0000ff;stroke-width:2.36754084;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
       inkscape:connector-curvature="0" />
    <path
       id="path4933"
       d="m -103.94788,221.42214 0,-8.7891 23.828121,0"
       style="fill:none;fill-rule:evenodd;stroke:#0000ff;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
       inkscape:connector-curvature="0" />
  </g>
  <g
     id="svgzmulti"
     transform="translate(483.61815,-112.13709)">
    <path
       id="path4871"
       d="m -381.91876,239.72157 -12.08162,-0.066"
       style="fill:none;fill-rule:evenodd;stroke:#0000ff;stroke-width:2.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
       inkscape:connector-curvature="0" />
    <text
       id="svgZDepth"
       y="197.08801"
       x="-330.31866"
       style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:13.75px;line-height:125%;font-family:sans-serif;-inkscape-font-specification:'sans-serif, Normal';text-align:start;letter-spacing:0px;word-spacing:0px;writing-mode:lr-tb;text-anchor:start;fill:#000000;fill-opacity:1;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
       xml:space="preserve"
       sodipodi:linespacing="125%"><tspan
         style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:15px;font-family:sans-serif;-inkscape-font-specification:sans-serif"
         y="197.08801"
         x="-330.31866"
         id="tspan4909">5mm per pass</tspan></text>
    <path
       id="path4931"
       d="m -381.45908,218.95767 0,-26.95315 46.09375,0"
       style="fill:none;fill-rule:evenodd;stroke:#0000ff;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
       inkscape:connector-curvature="0" />
    <path
       id="path4865"
       d="m -394.00061,251.80877 12.29132,0.068 0.26164,-47.64617 -12.29131,-0.0675"
       style="fill:none;fill-rule:evenodd;stroke:#0000ff;stroke-width:2.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
       inkscape:connector-curvature="0" />
    <path
       id="path4867"
       d="m -381.88529,214.76447 -11.98059,-0.066"
       style="fill:none;fill-rule:evenodd;stroke:#0000ff;stroke-width:2.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
       inkscape:connector-curvature="0" />
    <path
       id="path4869"
       d="m -381.78032,227.08537 -12.36075,0"
       style="fill:none;fill-rule:evenodd;stroke:#0000ff;stroke-width:2.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
       inkscape:connector-curvature="0" />
  </g>
  <g
     id="svgCNCFlatBit"
     transform="translate(380.52125,247.87751)">
    <path
       inkscape:connector-curvature="0"
       id="path4823"
       d="m -369.34499,-156.26431 14.54524,0 -0.27622,44.66938 43.93411,-0.1381 0.27621,-44.71271 16.70604,-0.20971"
       style="fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:3;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
    <path
       inkscape:connector-curvature="0"
       id="path4849"
       d="m -356.32553,-220.55121 0.0137,16.38768 0.0561,12.55643 49.25412,-0.0642 0,-24.83493 -0.1381,-20.66349"
       style="fill:none;fill-rule:evenodd;stroke:#ff0000;stroke-width:2.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
    <path
       inkscape:connector-curvature="0"
       id="path4851"
       d="m -307.37833,-216.03105 76.10167,-0.0809"
       style="fill:none;fill-rule:evenodd;stroke:#ff0000;stroke-width:1;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
    <text
       sodipodi:linespacing="125%"
       id="svgToolDia"
       y="-211.46725"
       x="-225.0869"
       style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:13.75px;line-height:125%;font-family:sans-serif;-inkscape-font-specification:'sans-serif, Normal';text-align:start;letter-spacing:0px;word-spacing:0px;writing-mode:lr-tb;text-anchor:start;fill:#000000;fill-opacity:1;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
       xml:space="preserve"><tspan
         style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:15px;font-family:sans-serif;-inkscape-font-specification:sans-serif"
         y="-211.46725"
         x="-225.0869"
         id="tspan4899">6.35mm</tspan><tspan
         id="tspan4182"
         style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:15px;font-family:sans-serif;-inkscape-font-specification:sans-serif"
         y="-192.71725"
         x="-225.0869" /></text>
    <path
       inkscape:connector-curvature="0"
       id="path4174"
       d="m -312.49911,-243.69463 0,42.99979 -38.72779,0 0.39063,-42.43636 9.07701,7.0511 5.88203,-7.07361 7.32121,7.63704 4.05022,-8.30309 4.73482,4.56964 z"
       style="fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:2.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
    <path
       inkscape:connector-curvature="0"
       id="path4176"
       d="m -351.47416,-209.13102 38.39368,-13.81068"
       style="fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" />
    <path
       inkscape:connector-curvature="0"
       id="path4178"
       d="m -336.55863,-201.94946 c 2.76214,0 23.47815,-9.11505 23.47815,-9.11505"
       style="fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" />
    <path
       inkscape:connector-curvature="0"
       id="path4180"
       d="m -350.64552,-223.77034 38.11747,-13.81068"
       style="fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" />
  </g>
  <rect
     style="fill:#ff0000;fill-opacity:0;stroke:#ff0000;stroke-width:1.84457076;stroke-miterlimit:4;stroke-dasharray:none"
     id="svgToolpath"
     width="114.21847"
     height="89.590302"
     x="308.72006"
     y="18.14473"
     ry="13.272638" />
  <rect
     style="fill:#ff0000;fill-opacity:0;stroke:#0000ff;stroke-width:2.23900008;stroke-miterlimit:4;stroke-dasharray:2.23900015, 2.23900015;stroke-dashoffset:0"
     id="svgOutside"
     width="138.17609"
     height="109.13578"
     x="297.19955"
     y="8.7037497"
     ry="16.168264" />
  <rect
     style="fill:#ff0000;fill-opacity:0;stroke:#0000ff;stroke-width:1.51533973;stroke-miterlimit:4;stroke-dasharray:1.51533978, 1.51533978;stroke-dashoffset:0"
     id="svgInside"
     width="95.214546"
     height="72.530975"
     x="318.30536"
     y="26.197523"
     ry="10.74533" />
  <g
     id="svgPocket"
     transform="matrix(1.0013674,0,0,0.84944881,-276.34691,-849.99524)">
    <g
       id="g4380"
       transform="translate(-4.9096098,90.563331)">
      <rect
         style="fill:#ff0000;fill-opacity:0;stroke:#0000ff;stroke-width:1.78147352;stroke-miterlimit:4;stroke-dasharray:1.78147351, 1.78147351;stroke-dashoffset:0"
         id="rect4184-5-0"
         width="95.084534"
         height="85.385933"
         x="598.74683"
         y="940.52863"
         ry="12.649768" />
      <rect
         style="fill:#ff0000;fill-opacity:0;stroke:#0000ff;stroke-width:1.57558465;stroke-miterlimit:4;stroke-dasharray:1.5755847, 1.5755847;stroke-dashoffset:0"
         id="rect4184-5-0-9"
         width="83.555679"
         height="76.005516"
         x="604.51123"
         y="944.92584"
         ry="11.260077" />
      <rect
         style="fill:#ff0000;fill-opacity:0;stroke:#0000ff;stroke-width:1.35175025;stroke-miterlimit:4;stroke-dasharray:1.35175022, 1.35175022;stroke-dashoffset:0"
         id="rect4184-5-0-9-7"
         width="72.043373"
         height="64.883835"
         x="610.46271"
         y="950.19373"
         ry="9.612421" />
      <rect
         style="fill:#ff0000;fill-opacity:0;stroke:#0000ff;stroke-width:1.13730586;stroke-miterlimit:4;stroke-dasharray:1.13730582, 1.13730582;stroke-dashoffset:0"
         id="rect4184-5-0-9-7-6"
         width="61.027447"
         height="54.220955"
         x="616.49939"
         y="956.07275"
         ry="8.0327358" />
      <rect
         style="fill:#ff0000;fill-opacity:0;stroke:#0000ff;stroke-width:0.91963297;stroke-miterlimit:4;stroke-dasharray:0.91963296, 0.91963296;stroke-dashoffset:0"
         id="rect4184-5-0-9-7-6-7"
         width="50.041553"
         height="43.235065"
         x="622.76917"
         y="961.41504"
         ry="6.4051967" />
      <rect
         style="fill:#ff0000;fill-opacity:0;stroke:#0000ff;stroke-width:0.31652647;stroke-miterlimit:4;stroke-dasharray:0.31652647, 0.31652647;stroke-dashoffset:0"
         id="rect4184-5-0-9-7-6-8"
         width="18.543131"
         height="13.822125"
         x="639.06384"
         y="975.91437"
         ry="2.0477226" />
      <rect
         style="fill:#ff0000;fill-opacity:0;stroke:#0000ff;stroke-width:0.46831697;stroke-miterlimit:4;stroke-dasharray:0.46831698, 0.46831698;stroke-dashoffset:0"
         id="rect4184-5-0-9-7-6-8-7"
         width="26.244591"
         height="21.378538"
         x="635.04993"
         y="971.84332"
         ry="3.1671915" />
      <rect
         style="fill:#ff0000;fill-opacity:0;stroke:#0000ff;stroke-width:0.59979939;stroke-miterlimit:4;stroke-dasharray:0.59979937, 0.59979937;stroke-dashoffset:0"
         id="rect4184-5-0-9-7-6-8-7-2"
         width="33.32164"
         height="27.620003"
         x="631.41028"
         y="968.73926"
         ry="4.0918531" />
      <rect
         style="fill:#ff0000;fill-opacity:0;stroke:#0000ff;stroke-width:0.74892002;stroke-miterlimit:4;stroke-dasharray:0.74892005, 0.74892005;stroke-dashoffset:0"
         id="rect4184-5-0-9-7-6-8-7-2-1"
         width="41.360172"
         height="34.691788"
         x="627.10986"
         y="965.41052"
         ry="5.1395249" />
    </g>
  </g>
  <text
     sodipodi:linespacing="125%"
     xml:space="preserve"
     x="343.36798"
     y="137.31038"
     id="svgOpName"
     inkscape:label="#text4368"><tspan
       id="tspan4370"
       x="343.36798"
       y="137.31038">Pocket</tspan></text>
  <g
     id="svgKnifeGrp"
     inkscape:label="#g4341"
     transform="translate(173.4606,-127.16365)">
    <path
       inkscape:connector-curvature="0"
       id="path4195"
       d="m -168.50164,219.09399 113.967555,0"
       style="fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:2.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
    <path
       sodipodi:nodetypes="ccccscccccsccc"
       inkscape:connector-curvature="0"
       id="path4203"
       d="m -145.56379,137.1404 0.21338,42.30401 15.43135,8.16574 7.77818,0 15.01085,-7.86656 c 0.58913,-0.30875 0.28032,-43.13352 0.28032,-43.13352 l -6.54072,3.53554 -6.01041,-4.06587 -1.94455,5.65686 -7.42462,-6.36396 c 0,0 0,7.24784 -0.88388,7.42462 -0.88388,0.17677 -10.07627,-6.36396 -10.07627,-6.36396 l -2.2981,4.59619 z"
       style="fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:2.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
    <path
       sodipodi:nodetypes="cccc"
       inkscape:connector-curvature="0"
       id="path4205"
       d="m -129.84767,188.17893 0,16.65806 7.90041,-14.24569 0.0205,-2.42033"
       style="fill:#999999;fill-rule:evenodd;stroke:#000000;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" />
    <path
       inkscape:connector-curvature="0"
       id="path4207"
       d="m -130.71455,207.58591 0,4.41942 4.94975,0 0,-4.24264"
       style="fill:none;fill-rule:evenodd;stroke:#ff0000;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" />
    <path
       inkscape:connector-curvature="0"
       id="path4209"
       d="m -126.26964,211.96188 37.875004,0 0.125,-24.5 62.125001,0"
       style="fill:none;fill-rule:evenodd;stroke:#ff0000;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" />
    <text
       inkscape:label="#text4211"
       sodipodi:linespacing="125%"
       id="dragKnifeRadius"
       y="191.77438"
       x="-19.20715"
       style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:13.75px;line-height:125%;font-family:sans-serif;-inkscape-font-specification:'sans-serif, Normal';text-align:start;letter-spacing:0px;word-spacing:0px;writing-mode:lr-tb;text-anchor:start;fill:#000000;fill-opacity:1;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
       xml:space="preserve"><tspan
         style="font-size:15px"
         y="191.77438"
         x="-19.20715"
         id="tspan4213"
         sodipodi:role="line">0.1mm</tspan></text>
    <path
       inkscape:connector-curvature="0"
       id="path4276"
       d="m -125.96832,206.68312 0.0749,-6.89125"
       style="fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:0.88800001;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:0.888, 1.776;stroke-dashoffset:0;stroke-opacity:1"
       sodipodi:nodetypes="cc" />
  </g>
  <g
     id="svgKnifeView"
     inkscape:label="#g4402"
     transform="translate(135.50001,-165.5)">
    <rect
       ry="0"
       y="182.39397"
       x="172.71388"
       height="89.442963"
       width="114.54527"
       id="rect4386"
       style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:2.00600004;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
    <path
       sodipodi:nodetypes="ccccccccccccccccccccc"
       inkscape:connector-curvature="0"
       id="path4400"
       d="m 183.94828,180.25888 117.79332,0.36428 -0.76777,4.85507 -2.66942,4.0962 -5.20863,2.71599 -3.35875,0.53033 -1.00889,91.97198 -5.3033,-0.16422 -3.97119,-2.10875 -2.75,-3.89797 -1.59099,-4.78554 -117.3635,-0.0518 0.20711,-4.88541 3.0052,-4.80698 4.50153,-2.50521 4.77297,0 0.70711,-91.7471 4.82474,0.36244 4.4512,2.19324 2.88611,4.19584 0.75889,3.66942"
       style="fill:none;fill-rule:evenodd;stroke:#0000ff;stroke-width:2.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:2.50000007, 2.50000007;stroke-dashoffset:0;stroke-opacity:1" />
  </g>
  <g
     id="svgzClearance"
     transform="translate(306.39066,44.191344)">
    <g
       id="svgzC">
      <path
         style="fill:none;fill-rule:evenodd;stroke:#008000;stroke-width:0.97431153px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
         d="m -233.90621,48.51138 10.4442,0 0.0692,-42.68627 -10.30719,0"
         id="path4891-8"
         inkscape:connector-curvature="0" />
      <path
         style="fill:none;fill-rule:evenodd;stroke:#008000;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
         d="m -223.80562,16.91137 62.92943,0.0572"
         id="path4901-8"
         inkscape:connector-curvature="0"
         sodipodi:nodetypes="cc" />
      <text
         xml:space="preserve"
         style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:13.75px;line-height:125%;font-family:sans-serif;-inkscape-font-specification:'sans-serif, Normal';text-align:start;letter-spacing:0px;word-spacing:0px;writing-mode:lr-tb;text-anchor:start;fill:#000000;fill-opacity:1;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
         x="-155.14944"
         y="21.256159"
         id="svgZClear-8"
         sodipodi:linespacing="125%"><tspan
           id="tspan4905-6"
           x="-155.14944"
           y="21.256159"
           style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:15px;font-family:sans-serif;-inkscape-font-specification:sans-serif">10mm</tspan></text>
    </g>
  </g>
  <g
     id="svgLaserGrp"
     inkscape:label="#g4259"
     transform="translate(-322.75,49.5)">
    <g
       id="g4378"
       inkscape:label="#svgLaserGrp"
       transform="translate(65.5,110.5)">
      <path
         sodipodi:nodetypes="cc"
         style="fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:2.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 263.01786,-70.0947 80.25782,-0.25"
         id="path4418"
         inkscape:connector-curvature="0" />
      <path
         style="fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:2.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 285.53601,-156.78976 0,43.94532 19.33594,17.96874 19.14062,-17.87109 0.19531,-43.65234"
         id="path4420"
         inkscape:connector-curvature="0" />
      <path
         style="fill:none;fill-rule:evenodd;stroke:#ff0000;stroke-width:0.99999994;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:0.99999997, 0.99999997;stroke-dashoffset:0;stroke-opacity:1"
         d="m 304.77429,-92.23897 0,19.33594"
         id="path4424"
         inkscape:connector-curvature="0" />
      <path
         style="fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
         d="m 285.69906,-115.5337 38.00699,0"
         id="path4278"
         inkscape:connector-curvature="0" />
      <path
         style="fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
         d="m 285.52227,-123.31187 37.47667,0"
         id="path4280"
         inkscape:connector-curvature="0" />
      <path
         style="fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:2.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
         d="m 285.96193,-156.07844 2.875,-4.5 6.375,7.375 6.875,-7.375 8.375,8.75 5.5,-7.25 8.125,3.625"
         id="path4282"
         inkscape:connector-curvature="0" />
      <path
         style="fill:none;fill-rule:evenodd;stroke:#ff0000;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
         d="m 306.07832,-81.01808 39.95153,0.17677 -0.35355,-40.48186 66.11448,0.70711"
         id="path4404"
         inkscape:connector-curvature="0"
         sodipodi:nodetypes="cccc" />
      <text
         xml:space="preserve"
         style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:13.75px;line-height:125%;font-family:sans-serif;-inkscape-font-specification:'sans-serif, Normal';text-align:start;letter-spacing:0px;word-spacing:0px;writing-mode:lr-tb;text-anchor:start;fill:#000000;fill-opacity:1;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
         x="412.74612"
         y="-116.61823"
         id="svgToolDia-4"
         sodipodi:linespacing="125%"><tspan
           id="tspan4899-6"
           x="412.74612"
           y="-116.61823"
           style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:15px;font-family:sans-serif;-inkscape-font-specification:sans-serif">0.12mm</tspan><tspan
           x="412.74612"
           y="-97.868233"
           style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:15px;font-family:sans-serif;-inkscape-font-specification:sans-serif"
           id="tspan4182-0" /></text>
    </g>
  </g>
  <g
     id="svgLaserRasterToolpath"
     transform="translate(-29.5,182.5)">
    <path
       inkscape:connector-curvature="0"
       id="path5020"
       d="m 359.37406,-88.603189 c -1.80716,-0.38381 -3.74975,-2.03216 -4.56039,-3.86963 l -0.44805,-1.01557 0,-28.146901 0,-28.1469 0.45264,-1.02623 c 0.8551,-1.93874 2.70235,-3.46853 4.66663,-3.86465 1.25786,-0.25366 66.26392,-0.25366 67.52179,0 1.96428,0.39612 3.81152,1.92591 4.66663,3.86465 l 0.45263,1.02623 0,28.1469 0,28.146901 -0.44804,1.01557 c -0.59863,1.35689 -1.89582,2.69981 -3.28326,3.39901 l -1.12872,0.56881 -33.58621,0.0273 c -18.47241,0.015 -33.90996,-0.0414 -34.30565,-0.12549 z m 67.14736,-5.59825 c 0.1633,-0.13194 0.3781,-0.46693 0.47732,-0.74442 0.25127,-0.70277 0.25127,-52.676091 0,-53.378861 -0.37544,-1.05004 1.87857,-0.98431 -33.75296,-0.98431 -35.63153,0 -33.37752,-0.0657 -33.75295,0.98431 -0.25127,0.70277 -0.25127,52.676091 0,53.378861 0.37543,1.05004 -1.87858,0.98431 33.75295,0.98431 26.78742,0 33.03445,-0.045 33.27564,-0.23989 z m -61.82825,-9.483521 0,-4.19806 6.46429,-6.87571 6.46429,-6.87571 3.25634,3.45906 3.25633,3.45906 10.41367,-11.07235 10.41368,-11.07234 8.41831,8.95028 8.41832,8.95027 0,9.73678 0,9.736771 -28.55262,0 -28.55261,0 0,-4.198051 z m 6.10562,-23.68491 c -1.2989,-0.27182 -2.61483,-1.04407 -3.74427,-2.19732 -1.80023,-1.83821 -2.46292,-3.70019 -2.32377,-6.52914 0.0703,-1.42882 0.17445,-1.90631 0.64415,-2.95283 1.70988,-3.80974 6.07907,-5.67397 9.7869,-4.17584 3.09555,1.25074 4.97929,4.19109 4.97929,7.77223 0,2.49178 -0.73384,4.26624 -2.49349,6.02939 -1.84811,1.85178 -4.29986,2.5869 -6.84881,2.0535 z"
       style="fill:#ff0000;stroke:#ff0000" />
    <path
       inkscape:connector-curvature="0"
       id="path4362"
       d="m 336.94611,-81.550789 113.13709,0"
       style="fill:none;fill-rule:evenodd;stroke:#0000ff;stroke-width:1;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:1, 1;stroke-dashoffset:0;stroke-opacity:1" />
    <path
       inkscape:connector-curvature="0"
       id="path4362-0"
       d="m 336.94611,-86.146999 113.13709,0"
       style="fill:none;fill-rule:evenodd;stroke:#0000ff;stroke-width:1;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:1, 1;stroke-dashoffset:0;stroke-opacity:1" />
    <path
       inkscape:connector-curvature="0"
       id="path4362-4"
       d="m 337.00257,-90.999859 113.13709,0"
       style="fill:none;fill-rule:evenodd;stroke:#0000ff;stroke-width:1;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:1, 1;stroke-dashoffset:0;stroke-opacity:1" />
    <path
       inkscape:connector-curvature="0"
       id="path4362-0-8"
       d="m 337.00257,-95.596069 113.13709,0"
       style="fill:none;fill-rule:evenodd;stroke:#0000ff;stroke-width:1;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:1, 1;stroke-dashoffset:0;stroke-opacity:1" />
    <path
       inkscape:connector-curvature="0"
       id="path4362-4-5"
       d="m 336.75257,-100.24986 113.13709,0"
       style="fill:none;fill-rule:evenodd;stroke:#0000ff;stroke-width:1;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:1, 1;stroke-dashoffset:0;stroke-opacity:1" />
    <path
       inkscape:connector-curvature="0"
       id="path4362-0-8-2"
       d="m 336.75257,-104.84607 113.13709,0"
       style="fill:none;fill-rule:evenodd;stroke:#0000ff;stroke-width:1;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:1, 1;stroke-dashoffset:0;stroke-opacity:1" />
    <path
       inkscape:connector-curvature="0"
       id="path4362-8"
       d="m 336.36867,-110.03147 113.13709,0"
       style="fill:none;fill-rule:evenodd;stroke:#0000ff;stroke-width:1;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:1, 1;stroke-dashoffset:0;stroke-opacity:1" />
    <path
       inkscape:connector-curvature="0"
       id="path4362-0-9"
       d="m 336.36867,-114.62768 113.13709,0"
       style="fill:none;fill-rule:evenodd;stroke:#0000ff;stroke-width:1;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:1, 1;stroke-dashoffset:0;stroke-opacity:1" />
    <path
       inkscape:connector-curvature="0"
       id="path4362-4-3"
       d="m 336.42513,-119.48054 113.13709,0"
       style="fill:none;fill-rule:evenodd;stroke:#0000ff;stroke-width:1;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:1, 1;stroke-dashoffset:0;stroke-opacity:1" />
    <path
       inkscape:connector-curvature="0"
       id="path4362-0-8-3"
       d="m 336.42513,-124.07675 113.13709,0"
       style="fill:none;fill-rule:evenodd;stroke:#0000ff;stroke-width:1;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:1, 1;stroke-dashoffset:0;stroke-opacity:1" />
    <path
       inkscape:connector-curvature="0"
       id="path4362-4-5-6"
       d="m 336.17513,-128.73054 113.13709,0"
       style="fill:none;fill-rule:evenodd;stroke:#0000ff;stroke-width:1;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:1, 1;stroke-dashoffset:0;stroke-opacity:1" />
    <path
       inkscape:connector-curvature="0"
       id="path4362-0-8-2-5"
       d="m 336.17513,-133.32675 113.13709,0"
       style="fill:none;fill-rule:evenodd;stroke:#0000ff;stroke-width:1;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:1, 1;stroke-dashoffset:0;stroke-opacity:1" />
    <path
       inkscape:connector-curvature="0"
       id="path4362-49"
       d="m 335.83834,-137.78541 113.13709,0"
       style="fill:none;fill-rule:evenodd;stroke:#0000ff;stroke-width:1;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:1, 1;stroke-dashoffset:0;stroke-opacity:1" />
    <path
       inkscape:connector-curvature="0"
       id="path4362-0-0"
       d="m 335.83834,-142.38162 113.13709,0"
       style="fill:none;fill-rule:evenodd;stroke:#0000ff;stroke-width:1;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:1, 1;stroke-dashoffset:0;stroke-opacity:1" />
    <path
       inkscape:connector-curvature="0"
       id="path4362-4-7"
       d="m 335.8948,-147.23448 113.13709,0"
       style="fill:none;fill-rule:evenodd;stroke:#0000ff;stroke-width:1;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:1, 1;stroke-dashoffset:0;stroke-opacity:1" />
    <path
       inkscape:connector-curvature="0"
       id="path4362-0-8-4"
       d="m 335.8948,-151.83069 113.13709,0"
       style="fill:none;fill-rule:evenodd;stroke:#0000ff;stroke-width:1;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:1, 1;stroke-dashoffset:0;stroke-opacity:1" />
    <path
       inkscape:connector-curvature="0"
       id="path4362-4-5-8"
       d="m 335.6448,-156.48448 113.13709,0"
       style="fill:none;fill-rule:evenodd;stroke:#0000ff;stroke-width:1;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:1, 1;stroke-dashoffset:0;stroke-opacity:1" />
    <path
       inkscape:connector-curvature="0"
       id="path4362-0-8-2-2"
       d="m 335.6448,-161.08069 113.13709,0"
       style="fill:none;fill-rule:evenodd;stroke:#0000ff;stroke-width:1;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:1, 1;stroke-dashoffset:0;stroke-opacity:1" />
  </g>
  <g
     id="svgCNCVbit"
     transform="translate(-30.5,14.5)">
    <g
       id="g4235"
       inkscape:label="#svgCNCVbit"
       transform="translate(-234.75945,72.124887)">
      <g
         id="g4256"
         inkscape:label="#svgCNCVbit"
         transform="translate(286.5,82.5)">
        <path
           sodipodi:nodetypes="cccccc"
           inkscape:connector-curvature="0"
           id="path4823-9"
           d="m -8.76988,-76.6145 14.54524,0 21.22378,23.66938 1.18411,0.1119 21.52621,-23.96271 16.70604,-0.20971"
           style="fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:3;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
        <path
           inkscape:connector-curvature="0"
           id="path4849-3"
           d="m 4.24958,-140.9014 0.0137,16.38768 0.0561,12.55643 49.25412,-0.0642 0,-24.83493 -0.1381,-20.66349"
           style="fill:none;fill-rule:evenodd;stroke:#ff0000;stroke-width:2.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
        <path
           inkscape:connector-curvature="0"
           id="path4851-4"
           d="m 53.19678,-156.38124 76.10167,-0.0809"
           style="fill:none;fill-rule:evenodd;stroke:#ff0000;stroke-width:1;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
        <text
           sodipodi:linespacing="125%"
           id="svgVbitDia"
           y="-150.56744"
           x="131.2382"
           style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:13.75px;line-height:125%;font-family:sans-serif;-inkscape-font-specification:'sans-serif, Normal';text-align:start;letter-spacing:0px;word-spacing:0px;writing-mode:lr-tb;text-anchor:start;fill:#000000;fill-opacity:1;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
           xml:space="preserve"><tspan
             style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:15px;font-family:sans-serif;-inkscape-font-specification:sans-serif"
             y="-150.56744"
             x="131.2382"
             id="tspan4899-7">10.00mm</tspan><tspan
             id="tspan4182-8"
             style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:15px;font-family:sans-serif;-inkscape-font-specification:sans-serif"
             y="-131.81744"
             x="131.2382" /></text>
        <path
           sodipodi:nodetypes="ccccccccccc"
           inkscape:connector-curvature="0"
           id="path4174-3"
           d="m 48.076,-164.04482 -0.5,25.74979 -18.65612,17.25 -19.07167,-17.5 -0.10937,-24.93636 9.07701,7.0511 5.88203,-7.07361 7.32121,7.63704 4.05022,-8.30309 4.73482,4.56964 z"
           style="fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:2.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
        <path
           sodipodi:nodetypes="ccc"
           inkscape:connector-curvature="0"
           id="path4338"
           d="m 7.96105,-103.30683 22.45064,23.68808 19.09188,-23.68808"
           style="fill:none;fill-rule:evenodd;stroke:#ff0000;stroke-width:2.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
        <path
           sodipodi:nodetypes="ccccccccc"
           inkscape:connector-curvature="0"
           id="path4340"
           d="m 20.98238,-90.90381 1.4375,-1.4375 2.25,-1.4375 2.3125,-1.25 3.0625,-0.3125 3.0625,0.25 2.75,0.9375 2.1875,1.125 1.5,1.0625"
           style="fill:none;fill-rule:evenodd;stroke:#800000;stroke-width:1;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:1, 2;stroke-dashoffset:0;stroke-opacity:1" />
        <path
           inkscape:connector-curvature="0"
           id="path4344"
           d="m 81.32338,-135.12663 10.25305,0 0,19.79899 -10.96016,0"
           style="fill:none;fill-rule:evenodd;stroke:#ff0000;stroke-width:2.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
        <path
           inkscape:connector-curvature="0"
           id="path4346"
           d="m 92.42998,-132.17168 c 0.70711,0 35.88567,0 35.88567,0"
           style="fill:none;fill-rule:evenodd;stroke:#ff0000;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" />
        <text
           inkscape:label="svgVbitAngle"
           sodipodi:linespacing="125%"
           id="svgVbitAngle"
           y="-85.131111"
           x="132.45406"
           style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:13.75px;line-height:125%;font-family:sans-serif;-inkscape-font-specification:'sans-serif, Normal';text-align:start;letter-spacing:0px;word-spacing:0px;writing-mode:lr-tb;text-anchor:start;fill:#000000;fill-opacity:1;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
           xml:space="preserve">90deg</text>
        <text
           sodipodi:linespacing="125%"
           id="svgVbitHeight"
           y="-126.88111"
           x="130.95406"
           style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:13.75px;line-height:125%;font-family:sans-serif;-inkscape-font-specification:'sans-serif, Normal';text-align:start;letter-spacing:0px;word-spacing:0px;writing-mode:lr-tb;text-anchor:start;fill:#000000;fill-opacity:1;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
           xml:space="preserve">10.00mm</text>
        <path
           inkscape:connector-curvature="0"
           id="path4446"
           d="m 18.52125,-131.8367 c 0,-1 25.25,-12.5 25.25,-12.5 l 3.25,-1.5"
           style="fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" />
        <path
           inkscape:connector-curvature="0"
           id="path4448"
           d="m 10.77125,-140.8367 36.5,-17.75"
           style="fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" />
        <path
           inkscape:connector-curvature="0"
           id="path4450"
           d="m 9.77125,-150.8367 19,-7.25"
           style="fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" />
        <path
           inkscape:connector-curvature="0"
           id="path4452"
           d="m 24.77125,-125.3367 c 1.25,-1.25 6.5,-8.75 6.5,-8.75 l 2.25,8.25"
           style="fill:none;fill-rule:evenodd;stroke:#000000;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" />
        <path
           inkscape:connector-curvature="0"
           id="path4259"
           d="m 129.5,-90.767717 -89.75,0"
           style="fill:none;fill-rule:evenodd;stroke:#ff0000;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
           sodipodi:nodetypes="cc" />
      </g>
      <g
         id="svgRasterPeck"
         inkscape:label="#g5147"
         transform="translate(6.363961,128.69343)">
        <ellipse
           ry="1.4356821"
           rx="1.3731821"
           cy="-184.90561"
           cx="582.8551"
           id="path4239-0-1"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:2.75363588;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="1.7202684"
           rx="1.7827684"
           cy="-184.65561"
           cx="590.7926"
           id="path4239-2-69-6"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:3.43446326;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="1.6592112"
           rx="1.3467113"
           cy="-185.28061"
           cx="598.7926"
           id="path4239-8-9-7"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:2.93157744;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="1.1047899"
           rx="0.97978985"
           cy="-185.09311"
           cx="606.4801"
           id="path4239-5-4-0"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:2.04042029;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="2.25"
           rx="1.625"
           cy="-185.03061"
           cx="615.0426"
           id="path4239-6-85-2"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:3.75;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="2.25"
           rx="1.625"
           cy="-184.71811"
           cx="574.8551"
           id="path4239-22-5-3"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:3.75;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="2.25"
           rx="1.625"
           cy="-185.06186"
           cx="631.38635"
           id="path4239-7-9-5"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:3.75;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="2.25"
           rx="1.625"
           cy="-184.93686"
           cx="639.19885"
           id="path4239-2-4-7-6"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:3.75;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="1.5084465"
           rx="1.1486114"
           cy="-185.03596"
           cx="647.08459"
           id="path4239-8-5-5-8"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:2.58145666;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="2.25"
           rx="1.625"
           cy="-185.18686"
           cx="655.38635"
           id="path4239-5-6-4-1"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:3.75;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="1.6312519"
           rx="1.0062519"
           cy="-185.60292"
           cx="663.62561"
           id="path4239-6-3-1-9"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:2.51262236;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="1.8516648"
           rx="1.2266648"
           cy="-185.02525"
           cx="622.99622"
           id="path4239-22-1-3-9"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:2.95568013;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="2.25"
           rx="1.625"
           cy="-185.08551"
           cx="671.63904"
           id="path4239-5-6-0-5-6"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:3.75;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="1.4393864"
           rx="1.1679398"
           cy="-185.32478"
           cx="679.70154"
           id="path4239-6-3-9-9-6"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:2.54280019;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="1.4356821"
           rx="1.3731821"
           cy="-176.17662"
           cx="639.74585"
           id="path4239-0-1-4"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:2.75363588;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="1.7202684"
           rx="1.7827684"
           cy="-175.92662"
           cx="647.68335"
           id="path4239-2-69-6-7"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:3.43446326;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="1.6592112"
           rx="1.3467113"
           cy="-176.55162"
           cx="655.68335"
           id="path4239-8-9-7-7"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:2.93157744;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="1.1047899"
           rx="0.97978985"
           cy="-176.36412"
           cx="663.37085"
           id="path4239-5-4-0-6"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:2.04042029;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="2.25"
           rx="1.625"
           cy="-176.30162"
           cx="671.93335"
           id="path4239-6-85-2-6"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:3.75;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="1.3570598"
           rx="1.2320598"
           cy="-175.73912"
           cx="631.62085"
           id="path4239-22-5-3-1"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:2.53588033;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="1.8516648"
           rx="1.2266648"
           cy="-176.29626"
           cx="679.88696"
           id="path4239-22-1-3-9-6"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:2.95568013;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="2.25"
           rx="1.625"
           cy="-175.50198"
           cx="582.64783"
           id="path4239-7-9-5-7-2"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:3.75;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="2.25"
           rx="1.625"
           cy="-175.37698"
           cx="590.46033"
           id="path4239-2-4-7-6-1-2"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:3.75;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="1.5084465"
           rx="1.1486114"
           cy="-175.47609"
           cx="598.34607"
           id="path4239-8-5-5-8-2-8"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:2.58145666;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="2.25"
           rx="1.625"
           cy="-175.62698"
           cx="606.64783"
           id="path4239-5-6-4-1-3-3"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:3.75;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="1.6312519"
           rx="1.0062519"
           cy="-176.04305"
           cx="614.88708"
           id="path4239-6-3-1-9-5-3"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:2.51262236;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="1.8516648"
           rx="1.2266648"
           cy="-175.46538"
           cx="574.25769"
           id="path4239-22-1-3-9-6-0"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:2.95568013;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="2.25"
           rx="1.625"
           cy="-175.52563"
           cx="622.90051"
           id="path4239-5-6-0-5-6-9-5"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:3.75;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="1.4356821"
           rx="1.3731821"
           cy="-166.5163"
           cx="575.8913"
           id="path4239-0-1-1"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:2.75363588;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="1.7202684"
           rx="1.7827684"
           cy="-166.2663"
           cx="583.8288"
           id="path4239-2-69-6-6"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:3.43446326;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="1.6592112"
           rx="1.3467113"
           cy="-166.8913"
           cx="591.8288"
           id="path4239-8-9-7-0"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:2.93157744;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="1.1047899"
           rx="0.97978985"
           cy="-166.7038"
           cx="599.5163"
           id="path4239-5-4-0-9"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:2.04042029;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="2.25"
           rx="1.625"
           cy="-166.6413"
           cx="608.0788"
           id="path4239-6-85-2-1"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:3.75;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="2.25"
           rx="1.625"
           cy="-166.3288"
           cx="567.8913"
           id="path4239-22-5-3-13"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:3.75;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="2.25"
           rx="1.625"
           cy="-166.67255"
           cx="624.42255"
           id="path4239-7-9-5-8"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:3.75;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="2.25"
           rx="1.625"
           cy="-166.54755"
           cx="632.23505"
           id="path4239-2-4-7-6-1"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:3.75;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="1.5084465"
           rx="1.1486114"
           cy="-166.64665"
           cx="640.12079"
           id="path4239-8-5-5-8-8"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:2.58145666;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="2.25"
           rx="1.625"
           cy="-166.79755"
           cx="648.42255"
           id="path4239-5-6-4-1-8"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:3.75;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="1.6312519"
           rx="1.0062519"
           cy="-167.21361"
           cx="656.6618"
           id="path4239-6-3-1-9-9"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:2.51262236;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="1.8516648"
           rx="1.2266648"
           cy="-166.63594"
           cx="616.03241"
           id="path4239-22-1-3-9-1"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:2.95568013;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="2.25"
           rx="1.625"
           cy="-166.6962"
           cx="664.67523"
           id="path4239-5-6-0-5-6-4"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:3.75;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="1.4393864"
           rx="1.1679398"
           cy="-166.93547"
           cx="672.73773"
           id="path4239-6-3-9-9-6-7"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:2.54280019;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="1.4356821"
           rx="1.3731821"
           cy="-157.78731"
           cx="632.78204"
           id="path4239-0-1-4-8"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:2.75363588;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="1.7202684"
           rx="1.7827684"
           cy="-157.53731"
           cx="640.71954"
           id="path4239-2-69-6-7-9"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:3.43446326;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="1.6592112"
           rx="1.3467113"
           cy="-158.16231"
           cx="648.71954"
           id="path4239-8-9-7-7-6"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:2.93157744;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="1.1047899"
           rx="0.97978985"
           cy="-157.97481"
           cx="656.40704"
           id="path4239-5-4-0-6-2"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:2.04042029;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="2.25"
           rx="1.625"
           cy="-157.91231"
           cx="664.96954"
           id="path4239-6-85-2-6-2"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:3.75;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="1.3570598"
           rx="1.2320598"
           cy="-157.34981"
           cx="624.65704"
           id="path4239-22-5-3-1-6"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:2.53588033;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="1.8516648"
           rx="1.2266648"
           cy="-157.90695"
           cx="672.92316"
           id="path4239-22-1-3-9-6-06"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:2.95568013;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="2.25"
           rx="1.625"
           cy="-157.11267"
           cx="575.68402"
           id="path4239-7-9-5-7-2-8"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:3.75;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="2.25"
           rx="1.625"
           cy="-156.98767"
           cx="583.49652"
           id="path4239-2-4-7-6-1-2-8"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:3.75;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="1.5084465"
           rx="1.1486114"
           cy="-157.08678"
           cx="591.38226"
           id="path4239-8-5-5-8-2-8-8"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:2.58145666;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="2.25"
           rx="1.625"
           cy="-157.23767"
           cx="599.68402"
           id="path4239-5-6-4-1-3-3-7"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:3.75;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="1.6312519"
           rx="1.0062519"
           cy="-157.65373"
           cx="607.92328"
           id="path4239-6-3-1-9-5-3-4"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:2.51262236;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="1.8516648"
           rx="1.2266648"
           cy="-157.07607"
           cx="567.29388"
           id="path4239-22-1-3-9-6-0-9"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:2.95568013;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="2.25"
           rx="1.625"
           cy="-157.13632"
           cx="615.93671"
           id="path4239-5-6-0-5-6-9-5-2"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:3.75;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="1.4356821"
           rx="1.3731821"
           cy="-148.2663"
           cx="608.1413"
           id="path4239-0-1-8"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:2.75363588;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="1.7202684"
           rx="1.7827684"
           cy="-148.0163"
           cx="616.0788"
           id="path4239-2-69-6-62"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:3.43446326;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="1.6592112"
           rx="1.3467113"
           cy="-148.6413"
           cx="624.0788"
           id="path4239-8-9-7-76"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:2.93157744;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="1.1047899"
           rx="0.97978985"
           cy="-148.4538"
           cx="631.7663"
           id="path4239-5-4-0-3"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:2.04042029;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="2.25"
           rx="1.625"
           cy="-148.3913"
           cx="640.3288"
           id="path4239-6-85-2-8"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:3.75;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="2.25"
           rx="1.625"
           cy="-148.0788"
           cx="600.1413"
           id="path4239-22-5-3-3"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:3.75;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="2.25"
           rx="1.625"
           cy="-148.42255"
           cx="656.67255"
           id="path4239-7-9-5-1"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:3.75;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="2.25"
           rx="1.625"
           cy="-148.29755"
           cx="664.48505"
           id="path4239-2-4-7-6-9"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:3.75;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="1.5084465"
           rx="1.1486114"
           cy="-148.39665"
           cx="672.37079"
           id="path4239-8-5-5-8-81"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:2.58145666;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="2.25"
           rx="1.625"
           cy="-184.54755"
           cx="566.67255"
           id="path4239-5-6-4-1-7"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:3.75;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="1.6312519"
           rx="1.0062519"
           cy="-147.71361"
           cx="584.6618"
           id="path4239-6-3-1-9-96"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:2.51262236;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="1.8516648"
           rx="1.2266648"
           cy="-148.38594"
           cx="648.28241"
           id="path4239-22-1-3-9-2"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:2.95568013;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="2.25"
           rx="1.625"
           cy="-148.4462"
           cx="568.67523"
           id="path4239-5-6-0-5-6-49"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:3.75;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="1.4393864"
           rx="1.1679398"
           cy="-148.68547"
           cx="576.73773"
           id="path4239-6-3-9-9-6-5"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:2.54280019;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="1.4356821"
           rx="1.3731821"
           cy="-139.53731"
           cx="665.03204"
           id="path4239-0-1-4-3"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:2.75363588;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="1.7202684"
           rx="1.7827684"
           cy="-175.78731"
           cx="567.21954"
           id="path4239-2-69-6-7-2"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:3.43446326;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="1.6592112"
           rx="1.3467113"
           cy="-139.41231"
           cx="673.21954"
           id="path4239-8-9-7-7-60"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:2.93157744;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="1.1047899"
           rx="0.97978985"
           cy="-138.47481"
           cx="584.40704"
           id="path4239-5-4-0-6-26"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:2.04042029;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="2.25"
           rx="1.625"
           cy="-139.66231"
           cx="568.96954"
           id="path4239-6-85-2-6-4"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:3.75;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="1.3570598"
           rx="1.2320598"
           cy="-139.09981"
           cx="656.90704"
           id="path4239-22-5-3-1-0"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:2.53588033;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="1.8516648"
           rx="1.2266648"
           cy="-139.65695"
           cx="576.92316"
           id="path4239-22-1-3-9-6-1"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:2.95568013;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="2.25"
           rx="1.625"
           cy="-138.86267"
           cx="607.93402"
           id="path4239-7-9-5-7-2-4"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:3.75;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="2.25"
           rx="1.625"
           cy="-138.73767"
           cx="615.74652"
           id="path4239-2-4-7-6-1-2-4"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:3.75;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="1.5084465"
           rx="1.1486114"
           cy="-138.83678"
           cx="623.63226"
           id="path4239-8-5-5-8-2-8-84"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:2.58145666;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="2.25"
           rx="1.625"
           cy="-138.98767"
           cx="631.93402"
           id="path4239-5-6-4-1-3-3-77"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:3.75;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="1.6312519"
           rx="1.0062519"
           cy="-139.40373"
           cx="640.17328"
           id="path4239-6-3-1-9-5-3-7"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:2.51262236;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="1.8516648"
           rx="1.2266648"
           cy="-138.82607"
           cx="599.54388"
           id="path4239-22-1-3-9-6-0-1"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:2.95568013;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="2.25"
           rx="1.625"
           cy="-138.88632"
           cx="648.18671"
           id="path4239-5-6-0-5-6-9-5-3"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:3.75;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="1.4356821"
           rx="1.3731821"
           cy="-130.2663"
           cx="569.3913"
           id="path4239-0-1-9"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:2.75363588;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="1.7202684"
           rx="1.7827684"
           cy="-130.0163"
           cx="577.3288"
           id="path4239-2-69-6-4"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:3.43446326;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="1.6592112"
           rx="1.3467113"
           cy="-130.6413"
           cx="585.3288"
           id="path4239-8-9-7-79"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:2.93157744;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="1.1047899"
           rx="0.97978985"
           cy="-130.4538"
           cx="593.0163"
           id="path4239-5-4-0-1"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:2.04042029;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="2.25"
           rx="1.625"
           cy="-130.3913"
           cx="601.5788"
           id="path4239-6-85-2-5"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:3.75;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="2.25"
           rx="1.625"
           cy="-148.0788"
           cx="591.8913"
           id="path4239-22-5-3-8"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:3.75;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="2.25"
           rx="1.625"
           cy="-130.42255"
           cx="617.92255"
           id="path4239-7-9-5-14"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:3.75;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="2.25"
           rx="1.625"
           cy="-130.29755"
           cx="625.73505"
           id="path4239-2-4-7-6-6"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:3.75;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="1.5084465"
           rx="1.1486114"
           cy="-130.39664"
           cx="633.62079"
           id="path4239-8-5-5-8-4"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:2.58145666;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="2.25"
           rx="1.625"
           cy="-130.54755"
           cx="641.92255"
           id="path4239-5-6-4-1-76"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:3.75;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="1.6312519"
           rx="1.0062519"
           cy="-130.96361"
           cx="650.1618"
           id="path4239-6-3-1-9-4"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:2.51262236;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="1.8516648"
           rx="1.2266648"
           cy="-130.38594"
           cx="609.53241"
           id="path4239-22-1-3-9-62"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:2.95568013;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="2.25"
           rx="1.625"
           cy="-130.4462"
           cx="658.17523"
           id="path4239-5-6-0-5-6-0"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:3.75;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="1.4393864"
           rx="1.1679398"
           cy="-130.68547"
           cx="666.23773"
           id="path4239-6-3-9-9-6-1"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:2.54280019;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="1.4356821"
           rx="1.3731821"
           cy="-121.5373"
           cx="626.28204"
           id="path4239-0-1-4-2"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:2.75363588;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="1.7202684"
           rx="1.7827684"
           cy="-121.2873"
           cx="634.21954"
           id="path4239-2-69-6-7-3"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:3.43446326;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="1.6592112"
           rx="1.3467113"
           cy="-121.9123"
           cx="642.21954"
           id="path4239-8-9-7-7-2"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:2.93157744;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="1.1047899"
           rx="0.97978985"
           cy="-121.7248"
           cx="649.90704"
           id="path4239-5-4-0-6-0"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:2.04042029;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="2.25"
           rx="1.625"
           cy="-121.6623"
           cx="658.46954"
           id="path4239-6-85-2-6-26"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:3.75;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="1.3570598"
           rx="1.2320598"
           cy="-121.0998"
           cx="618.15704"
           id="path4239-22-5-3-1-4"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:2.53588033;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="1.8516648"
           rx="1.2266648"
           cy="-121.65694"
           cx="666.42316"
           id="path4239-22-1-3-9-6-18"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:2.95568013;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="2.25"
           rx="1.625"
           cy="-120.86266"
           cx="569.18402"
           id="path4239-7-9-5-7-2-1"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:3.75;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="2.25"
           rx="1.625"
           cy="-120.73766"
           cx="576.99652"
           id="path4239-2-4-7-6-1-2-2"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:3.75;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="1.5084465"
           rx="1.1486114"
           cy="-120.83677"
           cx="584.88226"
           id="path4239-8-5-5-8-2-8-86"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:2.58145666;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="2.25"
           rx="1.625"
           cy="-120.98766"
           cx="593.18402"
           id="path4239-5-6-4-1-3-3-4"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:3.75;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="1.6312519"
           rx="1.0062519"
           cy="-121.40372"
           cx="601.42328"
           id="path4239-6-3-1-9-5-3-8"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:2.51262236;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="1.8516648"
           rx="1.2266648"
           cy="-138.82607"
           cx="591.29388"
           id="path4239-22-1-3-9-6-0-3"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:2.95568013;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="2.25"
           rx="1.625"
           cy="-120.88631"
           cx="609.43671"
           id="path4239-5-6-0-5-6-9-5-6"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:3.75;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="1.3570598"
           rx="1.2320598"
           cy="-167.23621"
           cx="680.24152"
           id="path4239-22-5-3-1-6-5"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:2.53588033;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="1.6592112"
           rx="1.3467113"
           cy="-158.52769"
           cx="679.66327"
           id="path4239-8-9-7-76-2"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:2.93157744;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="1.5084465"
           rx="1.1486114"
           cy="-148.84818"
           cx="680.09174"
           id="path4239-8-5-5-8-2-8-84-6"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:2.58145666;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="1.4393864"
           rx="1.1679398"
           cy="-131.2659"
           cx="673.42816"
           id="path4239-6-3-9-9-6-1-3"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:2.54280019;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="1.8516648"
           rx="1.2266648"
           cy="-122.23736"
           cx="673.61359"
           id="path4239-22-1-3-9-6-18-1"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:2.95568013;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="2.25"
           rx="1.625"
           cy="-139.52374"
           cx="680.86145"
           id="path4239-7-9-5-7-2-2"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:3.75;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="1.1047899"
           rx="0.97978985"
           cy="-122.19964"
           cx="681.21503"
           id="path4239-5-4-0-9-9"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:2.04042029;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
        <ellipse
           ry="1.1047899"
           rx="0.97978985"
           cy="-130.50813"
           cx="681.03821"
           id="path4239-5-4-0-9-3"
           style="fill:none;fill-opacity:1;stroke:#ff0000;stroke-width:2.04042029;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0" />
      </g>
    </g>
  </g>
</svg>

`