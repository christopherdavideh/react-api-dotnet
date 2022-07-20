import React,  { useEffect, useState } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import {Link} from 'react-router-dom';

function Department (){
    const [departments, setDepartments] = useState([]);
    const [dataDepartment, setDataDepartment] = useState({
      id: '',
      created_by: 'admin',
      description: '',
      name: '',
      phone: ''

    });
  
  const [modalDepartment, setModalDepartment] = useState(false);
  const [modalDepartmentEdit, setModalDepartmentEdit] = useState(false);
  const [modalDepartmentDelete, setModalDepartmentDelete] = useState(false);


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


  const getDepartments = async () => {
    const { data } = await api(`/Departments/getDepartments`/*,{
      params : {
          with_genres: id,
          page: page,
          language: languageApi,
      },
    }*/);
    setDepartments(data);

  }

  const saveDepartments = async () => {
    delete dataDepartment.id;
    const { data } = await axios.post(`${BASE_URL}/Departments/saveDepartments`,dataDepartment);
    //setDepartments(Departments.concat(data));
    openCloseModal();
    getDepartments();
  }

  const updateDepartments = async () => {
    const { data } = await axios.put(`${BASE_URL}/Departments/updateDepartments/${dataDepartment.id}`,dataDepartment);
    const auxData = departments;
    auxData.map(aux =>{
      if(aux.id === dataDepartment.id){
        aux.name = data.name;
        aux.description = data.description;
        aux.phone = data.phone;
        aux.modified_by = "admin";
        aux.modified_date = new Date();
      }
    });

    openCloseModalEdit();
    getDepartments();
  }

  const deleteDepartments = async () => {
    await axios.put(`${BASE_URL}/Departments/deleteDepartments/${dataDepartment.id}`);

    openCloseModalDelete();
    getDepartments();
  }

  useEffect(() => {
    getDepartments();
  },[]);

  const handleChange = e =>{
    const {name, value} = e.target;
    setDataDepartment({
      ...dataDepartment,
      [name]: value
    })
  }

  const openCloseModal = () => {
    setModalDepartment(!modalDepartment);
  }
  const openCloseModalEdit = () => {
    setModalDepartmentEdit(!modalDepartmentEdit);
  }
  const openCloseModalDelete = () => {
    setModalDepartmentDelete(!modalDepartmentDelete);
  }

  const onSubmit = (event) => {
    event.preventDefault();
    saveDepartments();
  }

  const selectEnterpise = (enterprise, action) => {
    setDataDepartment(enterprise);
    (action === "Edit") ? openCloseModalEdit() : openCloseModalDelete() ;
  }

  return (
    <>
      <header className="App-header">
        <nav>
            <Link to="/" className="btn btn-secondary">Enterprises </Link>{" "}
            <Link to="/departments" className="btn btn-secondary">Departements </Link>{" "}
            <Link to="/employees" className="btn btn-secondary">Employees </Link>
        </nav>

      </header>
      <main>
        <br/>
        <button className='btn btn-success' onClick={() => openCloseModal()}>New</button><br/> <br/>
        <table className='table table-bordered'>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Description</th>
              <th>Phone</th>
              <th>Created At</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {departments.map(department => (
              <tr key={department.id}>
                <td>{department.id}</td>
                <td>{department.name}</td>
                <td>{department.description}</td>
                <td>{department.phone}</td>
                <td>{department.created_date}</td>
                <td>
                  <button className='btn btn-primary' onClick={() => selectEnterpise(department, "Edit")}>Editar</button>
                  <button className='btn btn-danger' onClick={() => selectEnterpise(department, "Delete")}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Modal isOpen={modalDepartment}>
            <ModalHeader>
              New Department
            </ModalHeader>
            <ModalBody>
            <div className='form-group'>
                <label>Name:</label>
                <input type="text" className='form-control' required  placeholder='Name' name='name' onChange={handleChange}/>
                <label>Description:</label>
                <input type="text" className='form-control' required  placeholder='Description' name='description' onChange={handleChange}/>
                <label>Phone:</label>
                <input type="text" className='form-control' required  placeholder='Phone' name='phone' onChange={handleChange}/>
            </div>
            </ModalBody>
            <ModalFooter>
              <button className='btn btn-success' onClick={() => saveDepartments()}>Guardar</button>
              <button className='btn btn-danger' onClick={() => openCloseModal()}>Cancelar</button>
            </ModalFooter>
        </Modal>

        <Modal isOpen={modalDepartmentEdit}>
            <ModalHeader>
              Edit Department
            </ModalHeader>
            <ModalBody>
            <div className='form-group'>
                <input type='hidden' name='id'  value={dataDepartment && dataDepartment.id}/>
                <label>Name:</label>
                <input type="text" className='form-control' required  placeholder='Name' name='name' onChange={handleChange} value={dataDepartment && dataDepartment.name}/>
                <label>Description:</label>
                <input type="text" className='form-control' required  placeholder='Description' name='description' onChange={handleChange} value={dataDepartment && dataDepartment.description}/>
                <label>Phone:</label>
                <input type="text" className='form-control' required  placeholder='Phone' name='phone' onChange={handleChange} value={dataDepartment && dataDepartment.phone}/>
            </div>
            </ModalBody>
            <ModalFooter>
              <button className='btn btn-success' onClick={() => updateDepartments()}>Modificar</button>
              <button className='btn btn-danger' onClick={() => openCloseModalEdit()}>Cancelar</button>
            </ModalFooter>
        </Modal>

        <Modal isOpen={modalDepartmentDelete}>
            <ModalHeader>
              Delete Department
            </ModalHeader>
            <ModalBody>
             Estas seguro de eliminar el departamento?
            </ModalBody>
            <ModalFooter>
              <button className='btn btn-danger' onClick={() => deleteDepartments()}>Si</button>
              <button className='btn btn-primary' onClick={() => openCloseModalDelete()}>Cancelar</button>
            </ModalFooter>
        </Modal>
      </main>
    </>
  );
}

export {Department};