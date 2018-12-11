import React from 'react';
import {StyleSheet} from 'react-native';
import {Container, Content, Form, Item, Input, Label, Button, Text, Icon} from 'native-base';
import {AppHeader} from '../../components/AppHeader';
import * as Api from '../../utils/api';
import {red} from "../../utils/colors";


export default class AddCardView extends React.Component {

    state = {
        title: '',
        question: '',
        answer: '',
        error: false,
    };

    static navigationOptions = {
        headerTitle: <AppHeader title='Add new card'/>,
    };

    addCard = () => {
        const { question, answer} = this.state;
        const { deckKey, increaseCardsNumber } = this.props.navigation.state.params;

        if (answer && answer) {
            const key = Math.random().toString(36).substr(-8);

            const entry = {
                deckKey,
                key,
                answer,
                question,
            };

            Api.addCard({entry, key});
            increaseCardsNumber();
            this.props.navigation.goBack();
        } else {
            this.setState({error: true});
        }
    };

    render() {
        const {error} = this.state;

        return (
            <Container style={styles.container}>
                {error && (
                    <Text style={{color: red, fontSize: 18}}>Fields cannot be empty</Text>
                )}
                <Form style={styles.formContainer}>
                    <Item floatingLabel>
                        <Label>Question</Label>
                        <Input onChangeText={(question) => this.setState({question})} value={this.state.questionText}/>
                    </Item>
                    <Item floatingLabel>
                        <Label>Answer</Label>
                        <Input onChangeText={(answer) => this.setState({answer})} value={this.state.answerText}/>
                    </Item>
                </Form>

                <Container style={styles.actionButtonsContainer}>
                    <Button block onPress={this.addCard} style={styles.actionButton}><Text>Add card</Text></Button>
                    <Button bordered block
                            onPress={() => this.props.navigation.goBack()} style={styles.actionButton}>
                        <Text>Cancel</Text>
                    </Button>
                </Container>

            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 16,
    },
    formContainer: {
        justifyContent: 'flex-end',
    },
    actionButtonsContainer: {
        justifyContent: 'center',
    },
    actionButton: {
        marginTop: 24,
    }
});