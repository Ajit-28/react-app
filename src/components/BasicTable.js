import React, { useMemo } from 'react'
import { useSortBy, useTable, useGlobalFilter, usePagination, useRowSelect, useResizeColumns, useFlexLayout } from 'react-table'
import { COLUMNS } from './columns'
import MOCK_DATA from '../MOCK_DATA.json'
import './BasicTable.css'
import IndeterminateCheckbox from './CheckBox'
import GlobalFilter from './GlobalFilter'



const BasicTable = () => {

    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => MOCK_DATA, [])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        state,
        gotoPage,
        pageCount,
        setPageSize,
        setGlobalFilter,
        prepareRow,

    } = useTable({
        columns,
        data,

    },
        useGlobalFilter,
        useSortBy,
        usePagination,
        useRowSelect,
        useResizeColumns,
        useFlexLayout,



        (hooks) => {
            hooks.visibleColumns.push(columns => [
                {
                    id: 'selection',
                    Header: ({ getToggleAllRowsSelectedProps }) => (
                        <div>
                            <IndeterminateCheckbox  {...getToggleAllRowsSelectedProps()} />
                        </div>
                    ),
                    Cell: ({ row }) => (
                        <div >
                            <IndeterminateCheckbox  {...row.getToggleRowSelectedProps()} />
                        </div>
                    ),
                },
                ...columns,
            ])
        },
    )

    const { pageIndex, pageSize, selectedRowIds, globalFilter } = state

    return (
        <>
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')}
                                    <span className='span_icon'>
                                        {column.isSorted ? (column.isSortedDesc ? '🔽' : '🔼') : ''}
                                    </span>
                                    <div
                                        {...column.getResizerProps()}
                                        className={`resizer ${column.isResizing ? "isResizing" : ""
                                            }`}
                                    />
                                </th>
                            ))}
                        </tr>
                    ))}

                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div className='pagination'>
                <span className='page'>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{' '}
                </span>

                <span className='jump'>
                    | Go to page: {' '}
                    <input type='number' defaultValue={pageIndex + 1}
                        onChange={e => {
                            const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
                            gotoPage(pageNumber)
                        }}
                        style={{ width: '50px', height: '25px' }} />
                </span>

                <span className='para'><p>Selected Rows: {Object.keys(selectedRowIds).length}</p></span>

                <select className='select' value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
                    {
                        [10, 20, 50].map(pageSize => (
                            <option key={pageSize} value={pageSize} >
                                Show {pageSize}
                            </option>
                        ))
                    }
                </select>

                <button className='btn' onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {'<<'}
                </button>
                <button className='btn' onClick={() => previousPage()} disabled={!canPreviousPage}>
                    Previous
                </button>

                <button className='btn' onClick={() => nextPage()} disabled={!canNextPage}>
                    Next
                </button>
                <button className='btn' onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    {'>>'}
                </button>
            </div>
        </>
    )
}

export default BasicTable
