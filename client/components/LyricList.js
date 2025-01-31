import React, { Component } from 'react';
import { graphql} from 'react-apollo';
import gql from 'graphql-tag';

class LyricList extends Component {

    onLike(id, likes) {
        this.props.mutate({
            variables: {id},
            optimisticResponse: {
                __typename: 'Mutation',
                likeLyric: {
                    id: id,
                    __typename: 'LyricType',
                    likes: likes + 1,
                }
            }
        });
    }

    renderLyrics() {
        console.log(this.props);
        return this.props.lyrics.map(({id, content, likes}) => {
            return (
                <li key={id} className="collection-item">
                    {content}
                    <div className="vote-box">
                        <i
                            className="material-icons"
                            onClick={() => this.onLike(id, likes)}
                        >thumb_up</i>
                        {likes}
                    </div>
                </li>
            );
        });
    }

    render () {
        return (
            <div>
                <ul className="collection">
                    {this.renderLyrics()}
                </ul>
            </div>
        );
    }
}

const mutation = gql`
    mutation LikeLyric($id: ID) {
        likeLyric(id: $id) {
            id
            content
            likes
        }
    }
`;

export default graphql(mutation)(LyricList);
