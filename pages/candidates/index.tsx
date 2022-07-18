import type { NextPage } from 'next'
import Layout from '../../components/layout';
import Table from '../../components/ui/Table';

const Candidates: NextPage = () => {
    return (
    <Layout headerName="Candidates">
        <Table />
    </Layout>
    )
};

export default Candidates;
