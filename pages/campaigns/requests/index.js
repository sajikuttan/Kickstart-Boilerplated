import React, { Component } from 'react';
import { Button, Grid, Table } from 'semantic-ui-react';
import Layout from '../../../component/Layout';
import { Link } from '../../../routes';
import Campaign from '../../../ethereum/campaign';
import RequestRow from '../../../component/RequestRow';

class RequestIndex extends Component {

    static async getInitialProps(props) {
        const { address } = props.query;
        const campaign = Campaign(address);
        const requestCount = await campaign.methods.getRequestCount().call();

        const approversCount = await campaign.methods.approversCount().call();
        const requests = await Promise.all(Array(parseInt(requestCount)).fill().map((element, index) => {
            return campaign.methods.requests(index).call()
        }));

        return { address, requests, requestCount, approversCount }
    }

    renderRows() {

        return this.props.requests.map((request, index) => {
            return (<RequestRow key={index} id={index} request={request} address={this.props.address} approversCount={this.props.approversCount} />)
        });
    }

    render() {
        const { Header, Row, HeaderCell, Body } = Table;
        return (
            <Layout>

                <Grid>
                    <Grid.Row>
                        <Grid.Column width={1}>
                            <Link route={`/campaigns/${this.props.address}`}>
                                <a>Back</a>
                            </Link>
                        </Grid.Column>
                        <Grid.Column width={12}>
                            <h3>Pending Requests</h3>
                        </Grid.Column>
                        <Grid.Column width={3}>
                            <Link route={`/campaigns/${this.props.address}/requests/new`}>
                                <Button primary floated='right'>New Request</Button>
                            </Link>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Table celled>
                    <Header>
                        <Row>
                            <HeaderCell>ID</HeaderCell>
                            <HeaderCell>Description</HeaderCell>
                            <HeaderCell>Amount</HeaderCell>
                            <HeaderCell>Recipient</HeaderCell>
                            <HeaderCell>Approval Count</HeaderCell>
                            <HeaderCell>Approve</HeaderCell>
                            <HeaderCell>Finalize</HeaderCell>
                        </Row>
                    </Header>
                    <Body>
                        {this.renderRows()}
                    </Body>
                </Table>
                <div>Found {this.props.requestCount} requests</div>
            </Layout>
        )
    }
}

export default RequestIndex;