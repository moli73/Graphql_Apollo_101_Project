import gql from 'graphql-tag';

export default gql`
    query testQuery {
        songs {
            id
            title
        }
    }
`;
