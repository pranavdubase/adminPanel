
import React, { Component } from 'react';
import { browserHistory } from 'react-router';

//import css 
import 'react-select/dist/react-select.css'

// Class import
import RestApi from '../../../Fetch/RestApi';

// normal import 
import { Badge, Row, Col, Card, CardHeader, CardBody, Table, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, CardFooter, Form, FormGroup, FormText, Label, Input, InputGroup, InputGroupAddon, InputGroupButton } from 'reactstrap';

//material class import

//recent installed import invoke
import { BootstrapTable, TableHeaderColumn, SizePerPageDropDown, SearchField } from 'dubase-table'; import 'dubase-table/css/react-bootstrap-table.css'
import "babel-polyfill";
import Select from 'react-select';


// material design for menu handling
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';
// Dialog
import Dialog from 'material-ui/Dialog';//dialog box 
import FlatButton from 'material-ui/FlatButton';//flat button


class UomsRowExpand extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uoms: {
                // _dropdown: this.props.data.m_drop_down,//brands drop down
                uom_expand_data: this.props.data.manufacture_expand_data,//brand expand data
                u_table_data: [],
            },
            save_open: false,
        };
        //table input format
        this.tableInputAction = this.tableInputAction.bind(this);
        this.tableInputIdField = this.tableInputIdField.bind(this);
        this.tableInputNameField = this.tableInputNameField.bind(this);
        this.tableInputIdField = this.tableInputIdField.bind(this);
        this.tableInputParentMultiField = this.tableInputParentMultiField.bind(this);
        this.tableInputStateField = this.tableInputStateField.bind(this);
        //save function 
        this.openSaveData = this.openSaveData.bind(this);

    }
    componentWillReceiveProps(nextProps) {
        console.log("nextpr", nextProps.data.uom_expand_data)
        if (nextProps.data.uom_expand_data != null) {
            var uoms = { ...this.state.uoms };
            uoms.uom_expand_data = nextProps.data.uom_expand_data;
            uoms.u_table_data = uoms.uom_expand_data;
            console.log(uoms);
            this.setState({ uoms });
        }
        // var manufacturers = { ...this.state.manufacturers };
        // manufacturers.manufacture_expand_data = nextProps.data.manufacture_expand_data,//brand expand data
        //     manufacturers.manufacture_expand_data.city = manufacturers.manufacture_expand_data.contact.address[0].city;
        // manufacturers.manufacture_expand_data.state = manufacturers.manufacture_expand_data.contact.address[0].state;
        // manufacturers.u_table_data=[manufacturers.manufacture_expand_data];
        // this.setState({ manufacturers });
    }

    componentWillMount() {

        if (this.props.data != null) {
            console.log("uoms",this.props.data);
            var uoms = { ...this.state.uoms };
            uoms.uom_expand_data = this.props.data.uom_expand_data;
            uoms.u_table_data = uoms.uom_expand_data;
            this.setState({ uoms });

            // var manufacturers = { ...this.state.manufacturers };
            // manufacturers.manufacture_expand_data.city = manufacturers.manufacture_expand_data.contact.address[0].city;
            // manufacturers.manufacture_expand_data.state = manufacturers.manufacture_expand_data.contact.address[0].state;

            // manufacturers.u_table_data.push(manufacturers.manufacture_expand_data);
            // this.setState({ manufacturers });
        }

    }
    // openSaveData -------------------------------------------------------start
    openSaveData(event) {
        var data = this.state.manufacturers.manufacture_expand_data;
        data.contact.address[0].state = data.state;
        data.label = data.name;
        data.value = data.name;
        data.contact.address[0].city = data.city;
        var m_edit = {};
        m_edit.id = data.id;
        m_edit.name = data.name;
        m_edit.tags = data.tags;
        m_edit.contact = data.contact;

        console.log(m_edit);

        fetch(RestApi.isFetch("manufacturers/" + data.refId), RestApi.getPatchMethod(m_edit)).then(response => {//products fetch
            if (response.ok) {
                response.json().then(json => {
                    console.log(json)
                    this.props.onChangeValue(data);

                });
            }
            else
                this.props.history.replace('/login');
        }).catch(function (error) { console.log(error); });//end

        this.setState({ save_open: false });


    }

    //table data format
    tableInputAction(cellValue, rowData, nothing, cellFeild)//action button
    {
        return (
            <i class="material-icons" onClick={() => this.setState({ save_open: true })}>save</i>
        );

    }
    tableInputIdField(cellValue, rowData, nothing, cellFeild) {
        return (
            <input defaultValue={cellValue} readOnly className='filter text-filter form-control readonly-bg ' onBlur={(data) => rowData[cellFeild] = data.target.value} />
        );
    }
    tableInputNameField(cellValue, rowData, nothing, cellFeild) {
        return (
            <input defaultValue={cellValue} readOnly className='filter text-filter form-control readonly-bg ' onBlur={(data) => rowData[cellFeild] = data.target.value} />
        );
    }
    tableInputParentMultiField(cellValue, rowData, nothing, cellFeild) {
        return (
            <input defaultValue={cellValue} readOnly className='filter text-filter form-control  readonly-bg' onBlur={(data) => rowData[cellFeild] = data.target.value} />
        );
    }
    tableInputStateField(cellValue, rowData, nothing, cellFeild) {
        return (
            <input defaultValue={cellValue} readOnly className='filter text-filter form-control readonly-bg ' onBlur={(data) => rowData[cellFeild] = data.target.value} />
        );
    }


    render() {
        // console.log(this.state.manufacturers.u_table_data);
        const save_action = [ //dailog actions
            <FlatButton
                label="No"
                primary={true}
                onClick={() => this.setState({ save_open: false })}
            />,
            <FlatButton
                label="Yes"
                primary={true}
                onClick={this.openSaveData}

            />,
        ];
        if (this.props.data != null) {

            return (
                <div style={{ 'margin-left': '45px' }}>
                    <BootstrapTable width='190' data={this.state.uoms.u_table_data} condensed


                        hover
                        version="4"
                        ref='table'
                        tableHeaderClass='bgclr'
                        tableBodyClass='bgclr'
                        containerClass='bgclr'
                        tableContainerClass='bgclr'
                        headerContainerClass='bgclr'
                        bodyContainerClass='row-overflow'
                    >
                        {/* <TableHeaderColumn dataAlign='center' width="50" dataField='name' expandable={false} isKey={true} dataFormat={this.tableInputAction} >
                        </TableHeaderColumn> */}
                      


                        <TableHeaderColumn dataAlign='center' dataField='name' width="95" expandable={false} isKey={true} expandable={false} dataFormat={this.tableInputIdField} >id
                    </TableHeaderColumn>

                        <TableHeaderColumn dataAlign='center' dataField='name' width="192" expandable={false} dataFormat={this.tableInputNameField} >Manufacturers Name
                        </TableHeaderColumn>

                        <TableHeaderColumn dataAlign='center' dataField='parent_multiplier'  width="80"expandable={false} dataFormat={this.tableInputParentMultiField}>Multiplier </TableHeaderColumn>
                        <TableHeaderColumn dataAlign='center' dataField='parent_name' width="160" expandable={false} dataFormat={this.tableInputParentMultiField}>Parent </TableHeaderColumn>
                        <TableHeaderColumn dataAlign='center' dataField='dimension' width="120" expandable={false} dataFormat={this.tableInputParentMultiField}>Dimension   </TableHeaderColumn>
                        <TableHeaderColumn dataAlign='center' dataField='description'  width="250"expandable={false} dataFormat={this.tableInputParentMultiField}>Description   </TableHeaderColumn>
                        {/* <TableHeaderColumn dataAlign='center' width="300" tdStyle={{ whiteSpace: 'normal' }} dataField='tags' expandable={false} dataFormat={this.tableInputParentMultiField} > Tags                    </TableHeaderColumn> */}





                    </BootstrapTable>
                    <Dialog actions={save_action} modal={false} open={this.state.save_open} contentStyle={{
                        width: '25%',
                        maxWidth: 'none'
                    }} onRequestClose={() => this.setState({ save_open: false })}>
                        Do you want to Save ?
                </Dialog>
                </div>
            )
        }
        else {
            return (
                <div>Loading or error .....</div>
            )
        }
    }
}
export default UomsRowExpand;