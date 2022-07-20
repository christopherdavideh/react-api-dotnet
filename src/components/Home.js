import React,  { useEffect, useState } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import {Link} from 'react-router-dom';

function Home (){
    const [enterprises, setEnterprises] = useState([]);
    const [dataEnterprise, setDataEnterprise] = useState({
        id: '',
        created_by: 'admin',
        address: '',
        name: '',
        phone: ''

    });
  
  const [modalEnterprise, setModalEnterprise] = useState(false);
  const [modalEnterpriseEdit, setModalEnterpriseEdit] = useState(false);
  const [modalEnterpriseDelete, setModalEnterpriseDelete] = useState(false);


  const API_KEY = "";
  const BASE_URL = "https://localhost:7024";

  const api = axios.create({
      baseURL: BASE_URL,
      headers: {
          'Content-Type': 'aplication/json;charset=utf-8',
      },
      /*params: {
          'api_key': API_KEY,
      },*/
  });


  const getEnterprises = async () => {
    const { data } = await api(`/Enterprises/getEnterprises`/*,{
      params : {
          with_genres: id,
          page: page,
          language: languageApi,
      },
    }*/);
    setEnterprises(data);

  }

  const saveEnterprises = async () => {
    delete dataEnterprise.id;
    const { data } = await axios.post(`${BASE_URL}/Enterprises/saveEnterprises`,dataEnterprise);
    //setEnterprises(enterprises.concat(data));
    openCloseModal();
    getEnterprises();
  }

  const updateEnterprises = async () => {
    const { data } = await axios.put(`${BASE_URL}/Enterprises/updateEnterprises/${dataEnterprise.id}`,dataEnterprise);
    const auxData = enterprises;
    auxData.map(aux =>{
      if(aux.id === dataEnterprise.id){
        aux.name = data.name;
        aux.address = data.address;
        aux.phone = data.phone;
        aux.modified_by = "admin";
        aux.modified_date = new Date();
      }
    });

    openCloseModalEdit();
    getEnterprises();
  }

  const deleteEnterprises = async () => {
    await axios.put(`${BASE_URL}/Enterprises/deleteEnterprises/${dataEnterprise.id}`);

    openCloseModalDelete();
    getEnterprises();
  }

  useEffect(() => {
    getEnterprises();
  },[]);

  const handleChange = e =>{
    const {name, value} = e.target;
    setDataEnterprise({
      ...dataEnterprise,
      [name]: value
    })
  }

  const openCloseModal = () => {
    setModalEnterprise(!modalEnterprise);
  }
  const openCloseModalEdit = () => {
    setModalEnterpriseEdit(!modalEnterpriseEdit);
  }
  const openCloseModalDelete = () => {
    setModalEnterpriseDelete(!modalEnterpriseDelete);
  }

  const onSubmit = (event) => {
    event.preventDefault();
    saveEnterprises();
  }

  const selectEnterpise = (enterprise, action) => {
    setDataEnterprise(enterprise);
    (action === "Edit") ? openCloseModalEdit() : openCloseModalDelete() ;
  }

  return (
    <>
      <header className="App-header">
        <nav>
            <Link to="/" className="btn btn-secondary">Enterprises </Link>{" "}
            <Link to="/departments" className="btn btn-secondary">Departments </Link>{" "}
            <Link to="/employees" className="btn btn-secondary">Employees </Link>
        </nav>

      </header>
      <main>
        <br/>
        <button className='btn btn-success' onClick={() => openCloseModal()}>New</button><br/><br/>
        <table className='table table-bordered'>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Adress</th>
              <th>Phone</th>
              <th>Created At</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {enterprises.map(enterprise => (
              <tr key={enterprise.id}>
                <td>{enterprise.id}</td>
                <td>{enterprise.name}</td>
                <td>{enterprise.address}</td>
                <td>{enterprise.phone}</td>
                <td>{enterprise.created_date}</td>
                <td>
                  <button className='btn btn-primary' onClick={() => selectEnterpise(enterprise, "Edit")}>Editar</button>
                  <button className='btn btn-danger' onClick={() => selectEnterpise(enterprise, "Delete")}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Modal isOpen={modalEnterprise}>
            <ModalHeader>
              New Enterprise
            </ModalHeader>
            <ModalBody>
            <div className='form-group'>
                <label>Name:</label>
                <input type="text" className='form-control' required  placeholder='Name' name='name' onChange={handleChange}/>
                <label>Adress:</label>
                <input type="text" className='form-control' required  placeholder='Address' name='address' onChange={handleChange}/>
                <label>Phone:</label>
                <input type="text" className='form-control' required  placeholder='Phone' name='phone' onChange={handleChange}/>
            </div>
            </ModalBody>
            <ModalFooter>
              <button className='btn btn-success' onClick={() => saveEnterprises()}>Guardar</button>
              <button className='btn btn-danger' onClick={() => openCloseModal()}>Cancelar</button>
            </ModalFooter>
        </Modal>

        <Modal isOpen={modalEnterpriseEdit}>
            <ModalHeader>
              Edit Enterprise
            </ModalHeader>
            <ModalBody>
            <div className='form-group'>
                <input type='hidden' name='id'  value={dataEnterprise && dataEnterprise.id}/>
                <label>Name:</label>
                <input type="text" className='form-control' required  placeholder='Name' name='name' onChange={handleChange} value={dataEnterprise && dataEnterprise.name}/>
                <label>Adress:</label>
                <input type="text" className='form-control' required  placeholder='Address' name='address' onChange={handleChange} value={dataEnterprise && dataEnterprise.address}/>
                <label>Phone:</label>
                <input type="text" className='form-control' required  placeholder='Phone' name='phone' onChange={handleChange} value={dataEnterprise && dataEnterprise.phone}/>
            </div>
            </ModalBody>
            <ModalFooter>
              <button className='btn btn-success' onClick={() => updateEnterprises()}>Modificar</button>
              <button className='btn btn-danger' onClick={() => openCloseModalEdit()}>Cancelar</button>
            </ModalFooter>
        </Modal>

        <Modal isOpen={modalEnterpriseDelete}>
            <ModalHeader>
              Delete Enterprise
            </ModalHeader>
            <ModalBody>
             Estas seguro de eliminar la empresa?
            </ModalBody>
            <ModalFooter>
              <button className='btn btn-danger' onClick={() => deleteEnterprises()}>Si</button>
              <button className='btn btn-primary' onClick={() => openCloseModalDelete()}>Cancelar</button>
            </ModalFooter>
        </Modal>
      </main>
    </>
  );
}

export {Home};