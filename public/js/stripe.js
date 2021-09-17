import Stripe from 'stripe';
import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe(
  'pk_test_51JaEPZSC3dWmv6W113b6nzemlfjuRDt38xWD5K8cd2aNHhBRhYYnvwcCdbUppVeBlifouFKWLci3RvYAtAgeS1av00uICsirNV'
);

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from API
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
    );

    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    showAlert('error', err);
  }
};
