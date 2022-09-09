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
      <tr data-id"${koala.id}>
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

function addKoala( newKoala ){
  console.log( 'in saveKoala', newKoala );
  // ajax call to server to get koalas
  
  //moved from click listener function
  let koalaToSend = {
    name: 'testName',
    age: 'testName',
    gender: 'testName',
    readyForTransfer: 'testName',
    notes: 'testName',
  };
 
}
