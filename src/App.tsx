/*
 * Copyright 2019-2023 Bloomreach
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { BrPage, BrComponent } from '@bloomreach/react-sdk';
import { initialize, Page } from '@bloomreach/spa-sdk';
import axios from 'axios';
import { StrictMode, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Banner, Content, NewsList, Menu } from './components';

export default function App(): JSX.Element {
  const location = useLocation();

  const mapping = { Banner, Content, 'News List': NewsList, 'Simple Content': Content };
  const configuration = useMemo(() => ({
    endpoint: 'http://localhost:8080/delivery/site/v1/channels/spa-react-csr/pages',
    path: `${location.pathname}${location.search}`,
    httpClient: axios,
    debug: true,
  }), [location]);

  const [page, setPage] = useState<Page>();

  useEffect(() => {
    const fetchPageModel = async () => {
      const page = await initialize(configuration);
      setPage(page);
    };

    fetchPageModel();
  }, [configuration]);

  return (
    <StrictMode>
      {
        page && (
          <BrPage configuration={configuration} mapping={mapping} page={page}>
            <div>
              <BrComponent path="menu">
                <Menu />
              </BrComponent>
            </div>
            <div>
              <BrComponent path="main" />
            </div>
            <div>
              <BrComponent path="bottom" />
            </div>
          </BrPage>
        )
      }
    </StrictMode>
  );
}
