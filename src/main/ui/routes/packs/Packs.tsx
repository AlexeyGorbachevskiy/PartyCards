import React, {ChangeEvent, MouseEvent, useEffect, useState} from 'react';
import style from './Packs.module.scss'
import {Alert, Button, Checkbox, Form, Input, Modal, Popconfirm, Slider, Space, Table} from "antd";
import 'antd/dist/antd.css';
import {useDispatch, useSelector} from "react-redux";
import {
    deletePackThunkCreator,
    getPacksThunkCreator,
    PacksDataType,
    postNewPackThunkCreator,
    searchForPackName,
    setPacksErrorAC,
    sortPacks,
    updatePackThunkCreator
} from "../../../bll/state/packsReducer";
import {withAuthRedirect} from "../../../utilities/hoc/withAuthRedirect";
import {compose} from "redux";
import {AppRootType} from "../../../bll/state/store";
import {CheckboxChangeEvent} from "antd/es/checkbox";
import Search from "antd/es/input/Search";
import {NavLink} from "react-router-dom";
import Cards from "../cards/Cards";
import {setChosenPackDataAC} from "../../../bll/state/cardsReducer";


const Packs = () => {

    const page = useSelector<AppRootType, number | null>(state => state.packs.packsData.page);
    const currentPage = Number(page);

    const pageCount = useSelector<AppRootType, number | null>(state => state.packs.packsData.pageCount);
    const pageSize = Number(pageCount);


    const currentMinCardsCount = useSelector<AppRootType, number>(state => state.packs.currentMinCardsCount);
    const currentMaxCardsCount = useSelector<AppRootType, number>(state => state.packs.currentMaxCardsCount);
    const myAccountId = useSelector<AppRootType, string>(state => state.login._id);

    const mainError = useSelector<AppRootType, string>(state => state.packs.packsError);


    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState('');
    const isEditing = (record: Item) => record.key === editingKey;


    const transitionToCards = (record: any) => {

        const packName=packsData.cardPacks[+record.key - 1].name
        const packId=packsData.cardPacks[+record.key - 1]._id
        const cardsCount=packsData.cardPacks[+record.key - 1].cardsCount

        dispatch(setChosenPackDataAC({packName,packId,cardsCount}))

    }

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            align: 'center' as 'center',
            width: '7%'
        },
        {
            title: 'Pack name',
            dataIndex: 'name',
            key: 'name',
            editable: true,
            align: 'center' as 'center',
        },
        {
            title: 'Cards count',
            dataIndex: 'cardsCount',
            key: 'cardsCount',
            align: 'center' as 'center',
        },
        {
            title: 'Created',
            dataIndex: 'created',
            key: 'created',
            align: 'center' as 'center',
            sorter: (a: any, b: any) => a.created - b.created,
        },
        {
            title: 'Updated',
            dataIndex: 'updated',
            key: 'updated',
            align: 'center' as 'center',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            align: 'center' as 'center',
            render: (_: any, record: Item) => {
                const editable = isEditing(record);

                return editable ? (
                    <Space size="middle">
                        <span>
                            {/*href="javascript:;"*/}
                            <a
                                onClick={() => savePack(record.key)} style={{marginRight: 8}}>Save</a>
                            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                                <a>Cancel</a>
                            </Popconfirm>
                        </span>
                    </Space>
                ) : (
                    <Space size="middle">
                        {/*disabled={editingKey !== ''} */}
                        <a onClick={() => editPack(record)}>
                            Edit
                        </a>
                        <a onClick={() => deletePack(record)}>Delete</a>
                    </Space>
                );


            },
        },
        {
            title: 'Cards',
            key: 'cards',
            align: 'center' as 'center',
            render: (text: any, record: any) => (
                <Space size="middle">
                    <NavLink onClick={() => transitionToCards(record)}
                             to={`/cards/${packsData.cardPacks[+record.key - 1].name}/${packsData.cardPacks[+record.key - 1]._id}`}>Cards</NavLink>
                </Space>
            ),
        },
    ];

    const packsData = useSelector<AppRootType, PacksDataType>(state => state.packs.packsData);
    const isLoading = useSelector<AppRootType, boolean>(state => state.login.isLoading);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPacksThunkCreator(0, 26, 1, 50))
    }, []);


    let dataSource = packsData.cardPacks.map((el, index) => {
        let id;
        if (packsData.pageCount && packsData.cardPacksTotalCount) {
            if (packsData.page) {
                id = (packsData.page - 1) * packsData.pageCount + 1 + index
            }

        }

        return (
            {
                key: index + 1,
                id: id,
                name: el.name,
                cardsCount: el.cardsCount,
                updated: new Date(el.updated).toLocaleString(),
                created: new Date(el.created).toLocaleString(),
            }
        )
    })


    // on Table Change
    const onTableChange = (pagination: any, filters: any, sorter: any, extra: any) => {

        let myId = ''
        if (searchCheckboxValue) {
            myId = myAccountId
        }

        console.log(sorter.column)

        if (sorter.column) {

            dispatch(sortPacks(
                sorter.column.dataIndex,
                sorter.order,
                searchInputValue,
                myId,
                currentMinCardsCount,
                currentMaxCardsCount,
                currentPage,
                pageSize
            ))
        }

    }

    const handleAdd = () => {
        showModal()
    };

    const handleChange = (currentPage: any, pageSize: any) => {
        dispatch(getPacksThunkCreator(currentMinCardsCount, currentMaxCardsCount, Number(currentPage), Number(pageSize)))
    }


    // Delete Pack
    const deletePack = (record: Item) => {
        const id = packsData.cardPacks[+record.key - 1]._id
        dispatch(deletePackThunkCreator(currentMinCardsCount, currentMaxCardsCount, id, currentPage, pageSize))
    }

    // Edit Pack
    const editPack = (record: Item) => {
        form.setFieldsValue({...record});
        setEditingKey(record.key);
    }

    const cancel = () => {
        setEditingKey('');
    };

    const savePack = async (key: React.Key) => {
        const oldName = packsData.cardPacks[+key - 1].name;
        const newName = dataSource[+key - 1].name;
        const packId = packsData.cardPacks[+key - 1]._id;

        if (oldName !== newName) {
            dispatch(updatePackThunkCreator(currentMinCardsCount, currentMaxCardsCount, packId, newName, currentPage, pageSize))
        }
        setEditingKey("");
    }

    // modal
    const [stateVisible, setStateVisible] = useState(false);
    const [modalInputValue, setModalInputValue] = useState('');
    const [modalCheckboxValue, setModalCheckboxChange] = useState(false);
    const [isModalSearchInputError, setIsModalSearchInputError] = useState(false);

    const onModalCheckboxChange = (e: CheckboxChangeEvent) => {
        setModalCheckboxChange(e.target.checked)
    }

    const onModalInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setModalInputValue(e.currentTarget.value)
    }

    const showModal = () => {
        setStateVisible(true)
    };


    // Add new pack
    const handleOk = (e: MouseEvent<HTMLElement>) => {

        if (modalInputValue.trim() === '') {
            setIsModalSearchInputError(true)
            return
        }

        dispatch(postNewPackThunkCreator
        (
            currentMinCardsCount,
            currentMaxCardsCount,
            modalInputValue,
            modalCheckboxValue,
            Number(packsData.page),
            Number(packsData.pageCount
            )));

        setModalInputValue('')
        setStateVisible(false)
        setModalCheckboxChange(false)

        setIsModalSearchInputError(false)
    };

    const handleCancel = (e: MouseEvent<HTMLElement>) => {
        setModalInputValue('')
        setStateVisible(false)
        setModalCheckboxChange(false)

        setIsModalSearchInputError(false)
    };


    // Antd slider
    function onChange(value: any) {
    }

    function onAfterChange(value: any) {
        dispatch(getPacksThunkCreator(value[0], value[1], currentPage, pageSize))
    }

    // Antd search
    const [searchInputValue, setSearchInputValue] = useState('')
    const [searchCheckboxValue, setSearchCheckboxValue] = useState(false)

    const onSearchInputChange = (e: any) => {
        setSearchInputValue(e.currentTarget.value)
    }

    const onSearch = () => {

        let myId = ''
        if (searchCheckboxValue) {
            myId = myAccountId
        }

        dispatch(searchForPackName(
            searchInputValue,
            myId,
            currentMinCardsCount,
            currentMaxCardsCount,
            currentPage,
            pageSize
        ))

        // setSearchInputValue('')
    }

    const onSearchCheckboxChange = (e: any) => {
        setSearchCheckboxValue(e.target.checked)
    }

    const marks = {
        0: {
            style: {
                color: 'white'
            },
            label: 0
        },
        26: {
            style: {
                color: 'white'
            },
            label: 26
        },
    };


    const mergedColumns = columns.map((col) => {
        // if(col.key==='action'){
        //    return {
        //        ...col,
        //        onCell:(record:any)=>({
        //            record,
        //            inputType: col.dataIndex === "cardsCount" ? "number" : "text",
        //            dataIndex: col.dataIndex,
        //            title: col.title,
        //            align: 'center' as 'center',
        //        })
        //
        //    }
        // }
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record: any) => ({
                record,
                inputType: col.dataIndex === "cardsCount" ? "number" : "text",
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            })
        };
    });


    const onErrorAlertClose = (e: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(setPacksErrorAC(''))
    }


    return (
        <div className={style.packs}>

            <Modal
                maskClosable={false}
                destroyOnClose={true}
                centered={true}
                title="Add a row"
                visible={stateVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <label>Type new Pack name</label>
                <Input value={modalInputValue}
                       onChange={onModalInputChange}
                       style={
                           isModalSearchInputError ?
                               {borderColor: 'red', marginTop: '5px'}
                               :
                               {marginTop: '5px'}
                       }
                       type="text"
                />
                {
                    isModalSearchInputError ?
                        <div style={{textAlign: 'left', color: 'red'}}>Pack Name field is required</div>
                        : ''
                }

                {/*<label>Private</label> <span> </span>*/}
                <Checkbox style={{marginTop: '5px'}}
                          checked={modalCheckboxValue}
                          onChange={onModalCheckboxChange}
                >
                    {'Private'}
                </Checkbox>
            </Modal>


            <div className={style.pack_settings}>

                <Button
                    onClick={handleAdd}
                    className={style.add_btn}
                    // onClick={handleAdd}
                    type="primary"
                    style={{
                        // marginBottom: 16,
                        marginLeft: 16,
                    }}
                >
                    Add new Pack
                </Button>

                <div className={style.twice_slider}>
                    <h4>Filter by cards count</h4>
                    <Slider
                        marks={marks}
                        range
                        step={1}
                        min={0}
                        max={26}
                        defaultValue={[0, 26]}
                        onChange={onChange}
                        onAfterChange={onAfterChange}

                    />

                </div>

                <div className={style.search_wrapper}>
                    <Checkbox
                        className={style.search_checkbox}
                        checked={searchCheckboxValue}
                        onChange={onSearchCheckboxChange}
                    >My Packs Only
                    </Checkbox>
                    <Search className={style.search}
                            placeholder="Search for Pack Name"
                            onSearch={onSearch}
                            enterButton
                            size="middle"
                            value={searchInputValue}
                            onChange={onSearchInputChange}
                        // allowClear
                            loading={isLoading}
                    />
                </div>


            </div>


            <Form form={form} component={false}>
                <Table className={style.table} dataSource={dataSource}
                    // columns={columns}
                       columns={mergedColumns}

                       onChange={onTableChange}

                       components={{
                           body: {
                               cell: EditableCell,
                           },
                       }}
                       bordered
                       rowClassName={style.editableRow}
                       scroll={{x: 1500, y: 400}}
                       loading={isLoading}
                       pagination={{
                           total: packsData.cardPacksTotalCount ? packsData.cardPacksTotalCount : 5,
                           defaultPageSize: 50,
                           showSizeChanger: true,
                           pageSizeOptions: ['1', '5', '10', '50', '100'],
                           onChange: handleChange,
                           // onShowSizeChange: handleSelectSize
                       }}
                />
            </Form>

            {
                mainError &&
                <Alert
                    style={{position: 'absolute'}}
                    message="Error"
                    description={mainError}
                    type="error"
                    showIcon
                    closable
                    onClose={onErrorAlertClose}
                />
            }


        </div>
    )
}

interface Item {
    key: any;
    id: any,
    name: string;
    cardsCount: number,
    updated: any,
    created: string
}


interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: 'number' | 'text';
    record: Item;
    index: number;
    children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
                                                       editing,
                                                       dataIndex,
                                                       title,
                                                       inputType,
                                                       record,
                                                       index,
                                                       children,
                                                       ...restProps
                                                   }) => {

    const [editableInputValue, setEditableInputValue] = useState('')
    const onEditableInputChange = (e: any) => {
        setEditableInputValue(e.target.value)
        record.name = e.target.value
    }
    // const inputNode = inputType === 'number' ?
    //     <InputNumber value={0} onChange={onEditableInputChange} /> : <Input value={''} onChange={onEditableInputChange}/>;

    const inputNode = <Input value={editableInputValue} onChange={onEditableInputChange}/>;

    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{margin: 0}}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

export default compose(
    withAuthRedirect,
)(Packs)
