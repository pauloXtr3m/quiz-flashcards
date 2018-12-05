import React from 'react';
import {StyleSheet} from 'react-native';
import {Container, Content, Form, Item, Input, Label, Button, Text, Icon} from 'native-base';
import {AppHeader} from '../../components/AppHeader';
import * as Api from '../../utils/api';
import {red} from "../../utils/colors";


export default class AddCardView extends React.Component {

    state = {
        title: '',
        error: false,
    };

    static navigationOptions = {
        headerTitle: <AppHeader title='Add new deck'/>,
    };

    addCard = () => {
        const {title} = this.state;

        if (title) {
            const key = Math.random().toString(36).substr(-8);

            const entry = {
                key,
                title: this.state.title,
                cardsNumber: 0,
            };

            Api.addCard({entry, key});
            this.props.navigation.state.params.addCard(entry);
            this.props.navigation.goBack();
        } else {
            this.setState({error: true});
        }
    };

    render() {
        const {error} = this.state;

        return (
            <Container style={{margin: 8}}>
                {error && (
                    <Text style={{color: red, fontSize: 18}}>Title cannot be empty</Text>
                )}
                <Form>

                    <Item floatingLabel>
                        <Label>Title</Label>
                        <Input onChangeText={(title) => this.setState({title})} value={this.state.text}/>
                    </Item>

                </Form>

                <Button block style={styles.actionButton} onPress={this.addCard}><Text>Add card</Text></Button>
                <Button bordered block style={styles.actionButton}
                        onPress={() => this.props.navigation.goBack()}>
                    <Text>Cancel</Text>
                </Button>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    actionButton: {
        marginTop: 24,
        padding: 48,
        height: 50,
        width: 200,
    }
});