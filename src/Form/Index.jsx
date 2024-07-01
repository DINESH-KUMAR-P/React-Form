import React, { useState } from 'react';
import { Button, Modal, Form, DropdownButton, Dropdown } from 'react-bootstrap';
import '../App.css';
import { SlArrowLeft } from "react-icons/sl";
import { FaMinus } from "react-icons/fa";


const SegmentForm = () => {
  const [show, setShow] = useState(false);
  const [segmentName, setSegmentName] = useState('');
  const [selectedSchemas, setSelectedSchemas] = useState([]);
  const [ value,setValue ] = useState(0);


  const [schemas, setSchemas] = useState([
    { label: 'First Name', value: 'first_name' },
    { label: 'Last Name', value: 'last_name' },
    { label: 'Gender', value: 'gender' },
    { label: 'Age', value: 'age' },
    { label: 'Account Name', value: 'account_name' },
    { label: 'City', value: 'city' },
    { label: 'State', value: 'state' },
  ]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSaveSegment = () => {
    const segmentData = {
      segment_name: segmentName,
      schema: selectedSchemas.map(schema => ({ [schema.value]: schema.label }))
    };
    console.log('Segment Data:', segmentData);
    
    handleClose();
  };


  const divStyle = value !== 0 ? { border: '6px solid #6CB4EE' } : {};
  
  const handleAddSchema = (schema) => {
    setValue(value + 1)
    setSelectedSchemas([...selectedSchemas, schema]);
    setSchemas(schemas.filter(s => s.value !== schema.value));
  };

  const handleRemoveSchema = (index) => {
    setValue(value - 1)
    const schema = selectedSchemas[index];
    setSelectedSchemas(selectedSchemas.filter((_, i) => i !== index));
    setSchemas([...schemas, schema]);
  };

  const handleAddNewDropdown = () => {
    setValue(value + 1)
    if (schemas.length > 0) {
      const newSchema = schemas[0]; 
      setSelectedSchemas([...selectedSchemas, newSchema]);
      setSchemas(schemas.filter(schema => schema.value !== newSchema.value));
    }
  };

  return (
    <div className="container mt-5">
      <Button variant="primary" onClick={handleShow} style={{background: 'linear-gradient(0deg, rgba(0, 129, 116, 0.74) 0%, rgb(54, 196, 180) 100%)',border:'none'}}>
        Save Segment
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header style={{background: 'linear-gradient(0deg, rgba(0, 129, 116, 0.74) 0%, rgb(54, 196, 180) 100%)'}}>
        <SlArrowLeft style={{color:'white',widhth:'5px',marginTop:'4px'}}/> 
        &nbsp;
        &nbsp;
          <Modal.Title style={{color:'white'}}>Saving Segment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formSegmentName">
              <Form.Label><b>Enter the Name of the segment</b></Form.Label>
              <Form.Control
                type="text"
                placeholder="Name of the Segement"
                value={segmentName}
                onChange={(e) => setSegmentName(e.target.value)}
              />
            </Form.Group>
            <br />
            <p>To save your segment, you need to add the schemas to build the query</p>

        
            <div className="selected-schemas-box mt-3 p-3" style={divStyle}>
              
              {selectedSchemas.map((schema, index) => (
                <div key={index} className="d-flex align-items-center mb-2">
                  <DropdownButton
                    title={schema.label}
                    id={`dropdown-schema-${index}`}
                    className="mr-2 dropdown-custom"
                    variant="white"
                    size="md"
                    style={{border:'2px solid black'}}
                  >
                    {schemas.map((s, i) => (
                      <Dropdown.Item
                        key={i}
                        onClick={() => {
                          const updatedSchemas = [...selectedSchemas];
                          updatedSchemas[index] = s;
                          setSelectedSchemas(updatedSchemas);
                          setSchemas([...schemas.filter(sch => sch.value !== s.value), schema]);
                        }}
                        className="dropdown-item-custom"
                      >
                        {s.label}
                      </Dropdown.Item>
                    ))}
                  </DropdownButton>

                  &nbsp;
                      <div style={{backgroundColor:'#F0FFFF',padding:'2%'}}>
                  <FaMinus 
                    variant="danger"
                    onClick={() => handleRemoveSchema(index)}
                    title='Remove'
                    />
                </div>
                </div>
              ))}
          
            </div>

            <Form.Group  style={{paddingTop:'3%'}} controlId="formAddSchema">
              <DropdownButton
                title="Add schema to segment"
                id="dropdown-schema"
                size="md"
                variant="white"
                className="custom-dropdown"
                style={{border:'2px solid black',width: '80%'}}
              >
                {schemas.map((schema, index) => (
                  <Dropdown.Item
                    key={index}
                    variant="white"
                    onClick={() => handleAddSchema(schema)}
                  >
                    {schema.label}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </Form.Group>


            <Button
                variant="link"
                onClick={handleAddNewDropdown}
                className="mt-3"
                style={{color:'#00A693'}}
              >
                + Add new schema
              </Button>

          </Form>
        </Modal.Body>

        <Modal.Footer style={{display: 'flex', justifyContent: 'flex-start', backgroundColor:'rgb(240, 240, 240)'}}>
        <Button style={{background: 'linear-gradient(0deg, rgba(0, 129, 116, 0.74) 0%, rgb(54, 196, 180) 100%)',border:'none'}} onClick={handleSaveSegment}>
          Save the Segment
        </Button>
        <Button style={{backgroundColor:'white',color:'#BA0021',border:'none'}} onClick={handleClose}>
          Cancel
        </Button>
      </Modal.Footer>

      </Modal>
    </div>
  );
};

export default SegmentForm;
