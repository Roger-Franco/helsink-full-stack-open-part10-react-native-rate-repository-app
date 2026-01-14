import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
query repos($order: AllRepositoriesOrderBy, $dir: OrderDirection, $search: String, $first: Int, $after: String) { 
  repositories (orderBy: $order, orderDirection: $dir, searchKeyword: $search, first: $first, after: $after){
      edges{
          node{
            id
            ownerAvatarUrl
            fullName
            description
            language
            stargazersCount
            forksCount
            reviewCount
            ratingAverage
            language
          }
          cursor
      }
      pageInfo {
        endCursor
        startCursor
        totalCount
        hasNextPage
      }
  }
}
`;

// other queries...