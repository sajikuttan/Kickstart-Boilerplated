import React, { Component } from 'react';
import { Button, Card, Grid } from 'semantic-ui-react';
import ContributeForm from '../../component/ContributeForm';
import Layout from '../../component/Layout';
import Campaign from '../../ethereum/campaign';

import web3 from '../../ethereum/web3';
import { Link } from '../../routes';

class CampaignShow extends Component {

    static async getInitialProps(props) {
        const campaign = await Campaign(props.query.address);
        const summary = await campaign.methods.getSummary().call();
        return {
            address: props.query.address,
            minimumContribution: summary[0],
            balance: summary[1],
            requests: summary[2],
            approversCount: summary[3],
            manager: summary[4],
        };
    }

    renderCards() {
        const { minimumContribution, balance, requests, approversCount, manager } = this.props;

        const item = [
            {
                header: manager,
                meta: 'Address of Manager',
                description: "The manger created this campaign and can create the requests.",
                style: { overflowWrap: 'break-word' }
            },
            {
                header: minimumContribution,
                meta: 'Minimum Contribution (wei)',
                description: "You have to contribute atleast this much wei."
            },
            {
                header: requests,
                meta: 'Requests Count',
                description: "A requests tries to withdraw money from the contribution."
            },
            {
                header: approversCount,
                meta: 'Approvers Count',
                description: "Number of people who have already donated to the campaign."
            },
            {
                header: web3.utils.fromWei(balance, 'Ether'),
                meta: 'Balance (Enther)',
                description: "The Balance is how much money this campaign has left to spend."
            },
        ];
        return <Card.Group items={item} />
    }


    render() {
        return (
            <Layout>
                <h3>Campaign Details</h3>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={13}>
                            {this.renderCards()}
                        </Grid.Column>
                        <Grid.Column width={2}>
                            <ContributeForm address={this.props.address} />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Link route={`/campaigns/${this.props.address}/requests`}>
                                <Button primary>View Requests</Button>
                            </Link>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

            </Layout>
        )
    }
}

export default CampaignShow;