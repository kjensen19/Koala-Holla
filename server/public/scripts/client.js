console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // Establish Click Listeners
  setupClickListeners()
  // load existing koalas on page load
  getKoalas();

}); // end doc ready

function setupClickListeners() {
  $( '#addButton' ).on( 'click', addKoala);
  $('#viewKoalas').on('click', '.N', markAsReady)
}

function getKoalas(){
 
  // ajax call to server to get koalas
  $.ajax({
    type: 'GET',
    url: '/koalas'
  }).then(function(response){
    console.log(response);
    renderKoalas(response);
  }).catch(function(error){
    console.log('Error in Get', error);
  });
  
} // end getKoalas

function renderKoalas (koalas){
  $('#viewKoalas').empty();

  for(let koala of koalas){
    $('#viewKoalas').append(`
      <tr data-id="${koala.id}">
        <td>${koala.name}</td>
        <td>${koala.age}</td>
        <td>${koala.gender}</td>
        <td>${koala.readyForTransfer}</td>
        <td>${koala.notes}</td>
        <td><button class="${koala.readyForTransfer}">Ready For Transfer</button></td>
      </tr>
    `);
  }
}

function addKoala () {
  let koalaToSend = {
    name: $('#nameIn').val(),
    age: $('#ageIn').val(),
    gender: $('#genderIn').val(),
    readyForTransfer: $('#readyForTransferIn').val(),
    notes: $('#notesIn').val(),
  }
  // console.log( 'in addKoala', koalaToSend );
  // ajax call to server to get koalas
  $.ajax({
    type: 'POST',
    url: '/koalas',
    data: koalaToSend
  }).then(function(response){
    console.log(response);
    getKoalas();
    $('#nameIn').val('');
    $('#ageIn').val('');
    $('#genderIn').val('');
    $('#readyForTransferIn').val('');
    $('#notesIn').val('');
  }).catch(function(error){
    console.log('error in Koala post', error);
    alert('Error adding Koala.  Please try again!');
  });
  

  };

  function markAsReady() {
    let koalaToMarkReady = $(this).closest('tr').data('id')
    console.log(koalaToMarkReady)
    $.ajax({
      method: 'PUT',
      url: `/koalas/${koalaToMarkReady}`
    }).then((response) => {
      getKoalas()
    }).catch(function(error){
      console.log('error in Koala PUT', error)
      alert('Error marked as ready');
    })
  }
 
