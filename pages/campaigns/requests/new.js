import React, { Component } from 'react';
import { Button, Form, Input, Message } from 'semantic-ui-react';
import web3 from '../../../ethereum/web3';
import { Link, Router } from '../../../routes';
import Campaign from '../../../ethereum/campaign';
import Layout from '../../../component/Layout';

class RequestCreate extends Component {

    state = {
        description: '',
        value: '',
        recipient: '',
        errorMessage: '',
        loading: false
    }

    static async getInitialProps(props) {
        const { address } = props.query;

        return { address }
    }

    onSubmit = async (event) => {
        event.preventDefault();
        const { description, value, recipient } = this.state
        const accounts = await web3.eth.getAccounts();
        const campaign = await Campaign(this.props.address);
        this.setState({
            loading: true,
            errorMessage: ''
        })
        try {
            await campaign.methods.createRequest(description, web3.utils.toWei(value, 'ether'), recipient)
                .send({
                    from: accounts[0]
                });
            Router.pushRoute(`/campaigns/${this.props.address}/requests`);
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
                <Link route={`/campaigns/${this.props.address}`}>
                    <a>Back</a>
                </Link>
                <h3>Create a Request</h3>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Description </label>
                        <Input name='description' value={this.state.description} onChange={event => { this.setState({ description: event.target.value }) }} required />
                    </Form.Field>
                    <Form.Field>
                        <label>Value </label>
                        <Input label="ether" labelPosition='right' name='value' value={this.state.value} onChange={event => { this.setState({ value: event.target.value }) }} required />
                    </Form.Field>
                    <Form.Field>
                        <label>Recipient </label>
                        <Input name='recipient' value={this.state.recipient} onChange={event => { this.setState({ recipient: event.target.value }) }} required />
                    </Form.Field>
                    <Button type='submit' loading={this.state.loading} primary>Create</Button>
                    <Message error header="Oops!" content={this.state.errorMessage} />
                </Form>
            </Layout>
        )
    }
}

export default RequestCreate;