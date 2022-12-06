// this page only works with Jessie's config


import React, { useState, useEffect } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';

function Page() {

  const query = gql`
  query {
    BadgeLeaderboard {
      awardType {
        label
      }
      currentUserPosition {
        rank
        total
      }
      leaders {
          user {
          firstName
        }
      }
    }
  }`

  return (
      <div>   
        <h1>Submit Quiz</h1>
      </div>
  );
}

export { Page };