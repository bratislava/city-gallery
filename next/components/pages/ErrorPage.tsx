import { ContactAndFooterFragment } from '@bratislava/strapi-sdk-city-gallery';
import React from 'react';
import Footer from '../../components/molecules/Footer';

interface ErrorPageProps {
  contactInfo?: ContactAndFooterFragment | null;
  statusCode: number;
}

const ErrorPage = ({ statusCode, contactInfo }: ErrorPageProps) => {
  return (
    <>
      <div className="flex flex-col items-center w-full justify-center text-center h-[calc(100vh-119px)]">
        <h1 className="text-xxl">----- {statusCode} -----</h1>
        <h2 className="text-xl">
          {
            {
              404: 'Page not found',
              500: 'Internal server error',
            }[statusCode]
          }
        </h2>
      </div>
      {contactInfo && <Footer contactInfo={contactInfo} />}
    </>
  );
};

export default ErrorPage;
