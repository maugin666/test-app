import type { NextPage } from 'next'
import Layout from '../../components/layout';
import useSWR from 'swr';
import Table from '../../components/ui/Table';
import Error from '../../components/ui/Error';
import Loader from '../../components/ui/Loader';

const headers = [
    {
        field: 'name',
        value: 'Name',
        sortable: false,
        filterable: false,
    },
    {
        field: 'email',
        value: 'Email',
        sortable: false,
        filterable: false,
    },
    {
        field: 'age',
        value: 'Age',
        sortable: false,
        filterable: false,
    },
    {
        field: 'year_of_experience',
        value: 'Years of experience',
        sortable: true,
        filterable: false,
    },
    {
        field: 'position_applied',
        value: 'Position applied',
        sortable: false,
        filterable: false,
    },
    {
        field: 'application_date',
        value: 'Date of application',
        sortable: false,
        filterable: false,
    },
    {
        field: 'status',
        value: 'Status of the application',
        sortable: false,
        filterable: false,
    },
];

const Candidates: NextPage = () => {
    const fetcher = (url: string) => fetch(url).then(r => r.json());
    const { data } = useSWR('http://personio-fe-test.herokuapp.com/api/v1/candidates', fetcher);
    console.log(data)
    return (
    <Layout headerName="Candidates">
        {!data?.error && !data?.data && <Loader />}
        {data?.error && <Error error={data.error} />}
        {data?.data && <Table headers={headers} items={data.data}/>}
    </Layout>
    )
};

export default Candidates;
