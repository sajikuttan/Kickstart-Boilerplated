import React, { Component } from 'react';
import { Button, Form, Input, Message } from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

class ContributeForm extends Component {
    state = {
        value: '',
        errorMessage: '',
        loading: false
    }

    onSubmit = async (event) => {
        event.preventDefault();
        const campaign = Campaign(this.props.address);
        this.setState({
            loading: true,
            errorMessage: ''
        })
        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.contribute()
                .send({
                    value: web3.utils.toWei(this.state.value, 'ether'),
                    from: accounts[0]
                });
            Router.replace(`/campaigns/${this.props.address}`);
        } catch (err) {
            this.setState({
                errorMessage: err.message
            })
        } finally {
            this.setState({
                loading: false
            });
        }
    };

    render() {
        return (
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                <Form.Field>
                    <label>Amount to Contribute </label>
                    <Input label="ether" labelPosition='right' name='value' value={this.state.value} onChange={event => { this.setState({ value: event.target.value }) }} required />
                </Form.Field>
                <Button type='submit' loading={this.state.loading} primary>Contibute</Button>
                <Message error header="Oops!" content={this.state.errorMessage} />
            </Form>
        );
    }
}

export default ContributeForm;