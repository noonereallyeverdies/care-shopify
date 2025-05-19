import React from 'react';
import { useNavigate } from '@remix-run/react';
import { Button } from './Button';
import { PageHeader, Text } from './Text';

interface NotFoundProps {
  type?: string;
  customMessage?: string;
  showSearch?: boolean;
}

/**
 * Enhanced NotFound component with more capabilities
 * 
 * @param type - The type of resource not found (page, product, collection, etc.)
 * @param customMessage - Optional custom message to display
 * @param showSearch - Whether to show a search option
 */
export function NotFound({
  type = 'page',
  customMessage,
  showSearch = false,
}: NotFoundProps) {
  const navigate = useNavigate();
  const heading = `We couldn't find this ${type}`;
  const description = customMessage || 
    `The ${type} you're looking for might have been removed, had its name changed, or is temporarily unavailable.`;

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      <PageHeader heading={heading}>
        <div className="max-w-md mx-auto">
          <Text width="narrow" as="p" className="mb-6">
            {description}
          </Text>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
            <Button width="auto" variant="primary" to="/">
              Go to homepage
            </Button>
            
            <Button width="auto" variant="secondary" onClick={handleGoBack}>
              Go back
            </Button>
            
            {showSearch && (
              <Button width="auto" variant="secondary" to="/search">
                Search
              </Button>
            )}
          </div>
          
          {/* Additional helpful suggestions */}
          <div className="mt-12 text-center">
            <h3 className="text-lg font-medium mb-4">You might want to:</h3>
            <ul className="text-left list-disc pl-6 space-y-2 inline-block">
              <li>Check the URL for typos</li>
              <li>Browse our <Button className="inline p-0 underline" variant="link" to="/collections">collections</Button></li>
              <li>View our <Button className="inline p-0 underline" variant="link" to="/products">bestsellers</Button></li>
              <li>Contact <Button className="inline p-0 underline" variant="link" to="/support">customer support</Button></li>
            </ul>
          </div>
        </div>
      </PageHeader>
    </>
  );
}
