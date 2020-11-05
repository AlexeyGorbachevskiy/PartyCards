import React, {useEffect} from 'react';
import style from './Packs.module.scss'
import {Button, Space, Table} from "antd";
import 'antd/dist/antd.css';
import {useDispatch, useSelector} from "react-redux";
import {getPacksThunkCreator, PacksDataType} from "../../../bll/state/packsReducer";
import {withAuthRedirect} from "../../../utilities/hoc/withAuthRedirect";
import {compose} from "redux";
import {AppRootType} from "../../../bll/state/store";


const columns = [
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Pack name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Cards count',
        dataIndex: 'cardsCount',
        key: 'cardsCount',
    },
    {
        title: 'Created',
        dataIndex: 'created',
        key: 'created',
    },
    {
        title: 'Updated',
        dataIndex: 'updated',
        key: 'updated',
    },
    {
        title: 'Action',
        key: 'action',
        render: (text: any, record: any) => (
            <Space size="middle">
                {/*<a>Invite {record.name}</a>*/}
                <a>Edit</a>
                <a>Delete</a>
            </Space>
        ),
    },
    {
        title: 'Cards',
        key: 'cards',
        render: (text: any, record: any) => (
            <Space size="middle">
                {/*<a>Invite {record.name}</a>*/}
                <a>Cards</a>
            </Space>
        ),
    },
];

const Packs = () => {

    const packsData = useSelector<AppRootType, PacksDataType>(state => state.packs.packsData);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPacksThunkCreator(1, 10))
    }, []);


    let dataSource = packsData.cardPacks.map((el, index) => {
        let id;
        if (packsData.pageCount && packsData.cardPacksTotalCount) {
            // let pageCount = Math.ceil(packsData.cardPacksTotalCount / packsData.pageCount)

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
                updated: el.updated,
                created: el.created
            }
        )
    })


    // TODO: implement new pack adding
    const handleAdd = () => {
        // const { count, dataSource } = this.state;
        let pagesCount;
        if (packsData.cardPacksTotalCount && packsData.pageCount) {
            pagesCount = Math.ceil(packsData.cardPacksTotalCount / packsData.pageCount)
        }

        pagesCount = Number(pagesCount)

        const newData = {
            key: pagesCount,
            id: pagesCount,
            name: `Edward King ${pagesCount}`,
            cardsCount: 0,
            updated: `${new Date()}`,
            created: `${new Date()}`,
        };

        // state
        dataSource = [newData,...dataSource]
        pagesCount = pagesCount + 1

    };

    const handleChange = (currentPage: any, pageSize: any) => {
        // alert(currentPage +' //// '+pageSize)
        dispatch(getPacksThunkCreator(Number(currentPage), Number(pageSize)))
    }

    // const handleSelectSize = (currentPage: any, pageSize: any) => {
    //     alert(currentPage +' //// '+pageSize)
    //     // dispatch(getPacksThunkCreator(Number(currentPage), Number(pageSize)))
    // }

    // const dataSource = [
    //     {
    //         key: '1',
    //         name: 'John Brown',
    //         cardsCount: 32,
    //         updated: new Date().getHours(),
    //         created: new Date().getHours(),
    //     },
    //
    // ];

    return (
        <div className={style.packs}>

            <Button
                onClick={handleAdd}
                className={style.add_btn}
                // onClick={handleAdd}
                type="primary"
                style={{
                    marginBottom: 16,
                    marginLeft: 16,
                }}
            >
                Add a row
            </Button>

            <Table className={style.table} dataSource={dataSource} columns={columns}

                   scroll={{x: 1500, y: 300}}

                   pagination={{
                       total: packsData.cardPacksTotalCount ? packsData.cardPacksTotalCount : 5,
                       defaultPageSize: 10,
                       showSizeChanger: true,
                       pageSizeOptions: ['1', '5', '10', '50', '100'],
                       onChange: handleChange,
                       // onShowSizeChange: handleSelectSize
                   }}
            />

        </div>
    )
}

export default compose(
    withAuthRedirect,
)(Packs)
