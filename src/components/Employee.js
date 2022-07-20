import React,  { useEffect, useState } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import {Link} from 'react-router-dom';

function Employee (){
    const [employees, setEmployees] = useState([]);
    const [dataEmployee, setDataEmployee] = useState({
      id: '',
      created_by: 'admin',
      age: '',
      email: '',
      name: '',
      position: '',
      surname: ''

    });
  
  const [modalEmployee, setModalEmployee] = useState(false);
  const [modalEmployeeEdit, setModalEmployeeEdit] = useState(false);
  const [modalEmployeeDelete, setModalEmployeeDelete] = useState(false);


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


  const getEmployees = async () => {
    const { data } = await api(`/Employees/getEmployees`/*,{
      params : {
          with_genres: id,
          page: page,
          language: languageApi,
      },
    }*/);
    setEmployees(data);

  }

  const saveEmployees = async () => {
    delete dataEmployee.id;
    dataEmployee.age = parseInt(dataEmployee.age);
    const { data } = await axios.post(`${BASE_URL}/Employees/saveEmployees`,dataEmployee);
    //setEmployees(Employees.concat(data));
    openCloseModal();
    getEmployees();
  }

  const updateEmployees = async () => {
    const { data } = await axios.put(`${BASE_URL}/Employees/updateEmployees/${dataEmployee.id}`,dataEmployee);
    const auxData = employees;
    auxData.map(aux =>{
      if(aux.id === dataEmployee.id){
        aux.name = data.name;
        aux.email = data.email;
        aux.position = data.position;
        aux.modified_by = "admin";
        aux.modified_date = new Date();
        aux.age = data.age;
        aux.surname = data.surname
      }
    });

    openCloseModalEdit();
    getEmployees();
  }

  const deleteEmployees = async () => {
    await axios.put(`${BASE_URL}/Employees/deleteEmployees/${dataEmployee.id}`);

    openCloseModalDelete();
    getEmployees();
  }

  useEffect(() => {
    getEmployees();
  },[]);

  const handleChange = e =>{
    const {name, value} = e.target;
    setDataEmployee({
      ...dataEmployee,
      [name]: value
    })
  }

  const openCloseModal = () => {
    setModalEmployee(!modalEmployee);
  }
  const openCloseModalEdit = () => {
    setModalEmployeeEdit(!modalEmployeeEdit);
  }
  const openCloseModalDelete = () => {
    setModalEmployeeDelete(!modalEmployeeDelete);
  }

  const onSubmit = (event) => {
    event.preventDefault();
    saveEmployees();
  }

  const selectEnterpise = (enterprise, action) => {
    setDataEmployee(enterprise);
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
        <br />
        <button className='btn btn-success' onClick={() => openCloseModal()}>New</button><br /><br/>
        <table className='table table-bordered'>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Position</th>
              <th>Age</th>
              <th>Email</th>
              <th>Surname</th>
              <th>Created At</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(employee => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.position}</td>
                <td>{employee.age}</td>
                <td>{employee.email}</td>
                <td>{employee.surname}</td>
                <td>{employee.created_date}</td>
                <td>
                  <button className='btn btn-primary' onClick={() => selectEnterpise(employee, "Edit")}>Editar</button>
                  <button className='btn btn-danger' onClick={() => selectEnterpise(employee, "Delete")}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Modal isOpen={modalEmployee}>
            <ModalHeader>
              New Employee
            </ModalHeader>
            <ModalBody>
            <div className='form-group'>
                <label>Name:</label>
                <input type="text" className='form-control' required  placeholder='Name' name='name' onChange={handleChange}/>
                <label>Position:</label>
                <input type="text" className='form-control' required  placeholder='Position' name='position' onChange={handleChange}/>
                <label>Age:</label>
                <input type="number" className='form-control' required  placeholder='Age' name='age' onChange={handleChange}/>
                <label>Email:</label>
                <input type="email" className='form-control' required  placeholder='example@example.com' name='email' onChange={handleChange}/>
                <label>Surname:</label>
                <input type="text" className='form-control' required  placeholder='surname' name='surname' onChange={handleChange}/>
            </div>
            </ModalBody>
            <ModalFooter>
              <button className='btn btn-success' onClick={() => saveEmployees()}>Guardar</button>
              <button className='btn btn-danger' onClick={() => openCloseModal()}>Cancelar</button>
            </ModalFooter>
        </Modal>

        <Modal isOpen={modalEmployeeEdit}>
            <ModalHeader>
              Edit Employee
            </ModalHeader>
            <ModalBody>
            <div className='form-group'>
                <input type='hidden' name='id'  value={dataEmployee && dataEmployee.id}/>
                <label>Name:</label>
                <input type="text" className='form-control' required  placeholder='Name' name='name' onChange={handleChange} value={dataEmployee && dataEmployee.name}/>
                <label>Position:</label>
                <input type="text" className='form-control' required  placeholder='Position' name='position' onChange={handleChange} value={dataEmployee && dataEmployee.position}/>
                <label>Age:</label>
                <input type="number" className='form-control' required  placeholder='Age' name='age' onChange={handleChange} value={dataEmployee && dataEmployee.age}/>
                <label>Email:</label>
                <input type="email" className='form-control' required  placeholder='example@example.com' name='email' onChange={handleChange} value={dataEmployee && dataEmployee.email}/>
                <label>Surname:</label>
                <input type="text" className='form-control' required  placeholder='surname' name='surname' onChange={handleChange} value={dataEmployee && dataEmployee.surname}/>
            </div>
            </ModalBody>
            <ModalFooter>
              <button className='btn btn-success' onClick={() => updateEmployees()}>Modificar</button>
              <button className='btn btn-danger' onClick={() => openCloseModalEdit()}>Cancelar</button>
            </ModalFooter>
        </Modal>

        <Modal isOpen={modalEmployeeDelete}>
            <ModalHeader>
              Delete Employee
            </ModalHeader>
            <ModalBody>
             Estas seguro de eliminar este empleado?
            </ModalBody>
            <ModalFooter>
              <button className='btn btn-danger' onClick={() => deleteEmployees()}>Si</button>
              <button className='btn btn-primary' onClick={() => openCloseModalDelete()}>Cancelar</button>
            </ModalFooter>
        </Modal>
      </main>
    </>
  );
}

export {Employee};