import React, { Component } from 'react';
import { Button, Form, Input, Label, Message } from 'semantic-ui-react';
import Layout from '../../component/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';

class CampaignNew extends Component {
    state = {
        minimumContribution: '',
        errorMessage: '',
        loading: false
    }

    onSubmit = async (event) => {
        event.preventDefault();
        const accounts = await web3.eth.getAccounts();
        this.setState({
            loading: true,
            errorMessage: ''
        })
        try {
            await factory.methods.createCampaign(this.state.minimumContribution)
                .send({
                    from: accounts[0]
                });
            Router.pushRoute('/');
        } catch (err) {
            this.setState({
                errorMessage: err.message
            })
        } finally {
            this.setState({
                loading: false
            })
        }
    };

    render() {
        return (
            <Layout>
                <h3>Create a Campaign</h3>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Minimum Contribution </label>
                        <Input label="wei" labelPosition='right' placeholder='Minimum Contribution' name='minimum_contribution' value={this.state.minimumContribution} onChange={event => { this.setState({ minimumContribution: event.target.value }) }} required />
                    </Form.Field>
                    <Button type='submit' loading={this.state.loading} primary>Contibute</Button>
                    <Message error header="Oops!" content={this.state.errorMessage} />
                </Form>
            </Layout>
        )
    }
}

export default CampaignNew;