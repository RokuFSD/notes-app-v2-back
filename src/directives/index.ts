import { AuthChecker } from 'type-graphql';
import { auth } from 'firebase-admin';
import DecodedIdToken = auth.DecodedIdToken;
import { UserRepository } from '../repositories';

export const customAuthChecker: AuthChecker<DecodedIdToken> = async (
  { root, args, context, info },
  roles
) => {
  // Check if the email is in the database
  // If it is, return true
  // If it isn't, return false
  const email = context.email;
  const userRepo = await UserRepository.findOne({
    where: {
      email: email,
    },
  });
  return !!userRepo;
};
