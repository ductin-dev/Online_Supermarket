import DataTable, { createTheme } from 'react-data-table-component';

//Table Theme
createTheme('solarized', {
    text: {
        primary: '#268bd2',
        secondary: '#2aa198'
    },
    background: {
        default: 'none'
    },
    context: {
        background: 'none',
        text: '#FFFFFF'
    },
    divider: {
        default: '#073642'
    },
    action: {
        button: 'rgba(0,0,0,.54)',
        hover: 'rgba(0,0,0,.08)',
        disabled: 'rgba(0,0,0,.12)'
    }
});

//Table column structure
const columns = [
    {
        name: 'Title',
        sortable: false,
        cell: (row: any) => (
            <span style={{ fontWeight: 800 }}>
                {row.Title}
                <br></br>
                <span style={{ fontWeight: 200 }}>with Worker:{row.CWork}</span>
            </span>
        )
    },
    {
        name: 'Image',
        sortable: false,
        cell: (row: any) => <img src={row.ImgBase64} alt="X" style={{ height: 100, width: 200, objectFit: 'cover' }}></img>
    },
    {
        name: 'Type',
        cell: (row: any) => <div>{row.Type}</div>
    }
];
const ItemList = () => (
    <DataTable
        title={
            <span>
                <hr></hr>
                Demo data
                <button
                    style={{ fontSize: 12 }}
                    className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-1 py-1 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                    onClick={() => {}}
                >
                    Clear All Data
                </button>
            </span>
        }
        columns={columns}
        data={['abc']}
        pagination={true}
        paginationPerPage={5}
        paginationRowsPerPageOptions={[5, 10, 30, 100]}
    />
);

export default ItemList;
