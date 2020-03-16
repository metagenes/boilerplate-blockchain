import Web3 from 'web3';
import Crud from '../build/contracts/Crud.json';

let web3;
let crud;

const initWeb3 = () => {
  return new Promise((resolve, reject) => {
    if(typeof window.ethereum !== 'undefined') {
      const web3 = new Web3(window.ethereum);
      window.ethereum.enable()
        .then(() => {
          resolve(
            new Web3(window.ethereum)
          );
        })
        .catch(e => {
          reject(e);
        });
      return;
    }
    if(typeof window.web3 !== 'undefined') {
      return resolve(
        new Web3(window.web3.currentProvider)
      );
    }
    resolve(new Web3('http://localhost:9545'));
  });
};

const initContract = () => {
  const deploymentKey = Object.keys(Crud.networks)[0];
  return new web3.eth.Contract(
    Crud.abi, 
    Crud
      .networks[deploymentKey]
      .address
  );
};

const initApp = () => {
  const $create = document.getElementById('create');
  const $createResult = document.getElementById('create-result');
  const $read = document.getElementById('read');
  const $readResult = document.getElementById('read-result');
  const $edit = document.getElementById('edit');
  const $editResult = document.getElementById('edit-result');
  const $delete = document.getElementById('delete');
  const $deleteResult = document.getElementById('delete-result');
  let accounts = [];

  web3.eth.getAccounts()
  .then(_accounts => {
    accounts = _accounts;
  });

  $create.addEventListener('submit', (e) => {
    e.preventDefault();
    const drivername = e.target.elements[0].value;
    crud.methods.create(drivername).send({from: accounts[0]})
    .then(result => {
      $createResult.innerHTML = `New cars ${drivername} successfully created`;
    })
    .catch(_e => {
      $createResult.innerHTML = `Ooops... there was an error while trying to create a new user...`;
    });
  });

  $read.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = e.target.elements[0].value;
    crud.methods.read(id).call()
    .then(result => {
      $readResult.innerHTML = `Id: ${result[0]} Branding: ${result[1]}`;
    })
    .catch(_e => {
      $readResult.innerHTML = `Ooops... there was an error while trying to read car ${id}`;
    });
  });

  $edit.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = e.target.elements[0].value;
    const status = e.target.elements[1].value;
    crud.methods.update(id, status).send({from: accounts[0]})
    .then(result => {
      $editResult.innerHTML = `Changed status of car ${id} to ${status}`;
    })
    .catch(_e => {
      $editResult.innerHTML = `Ooops... there was an error while trying to update status of car ${id} to ${status}`;
    });
  });

  $delete.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = e.target.elements[0].value;
    crud.methods.destroy(id).send({from: accounts[0]})
    .then(result => {
      $deleteResult.innerHTML = `Deleted car ${id}`;
    })
    .catch(_e => {
      $deleteResult.innerHTML = `Ooops... there was an error while trying to delete car with id = ${id}`;
    });
  });
};

document.addEventListener('DOMContentLoaded', () => {
  initWeb3()
    .then(_web3 => {
      web3 = _web3;
      crud = initContract();
      initApp(); 
    })
    .catch(e => console.log(e.message));
});
