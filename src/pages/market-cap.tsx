import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { useQuery } from '@tanstack/react-query';
import { SymbolsListResultApi, TagItem } from '@/lib/schema/ApiTypes';
import { TablePagingation } from '@/components/ui/Table/TablePagination';
import { TABLE_LIMIT } from '@/lib/config';
import HomepageTableHeader from '@/components/pages/homepage/HomepageTableHeader';
import endpoints from '@/lib/endpoints';
import { useRouter } from 'next/router';
import Head from 'next/head';
import LoadingSkeleton from '@/components/ui/Table/LoadingSkeleton';
import _ from 'lodash';
import useDebounce from '@/lib/hooks/useDebounce';
import { usePathname, useSearchParams } from 'next/navigation';
import Layout from '@/components/Layout';
import { fetchJson } from '@/lib/utils';
import PairsTable from '@/components/pages/homepage/PairsTable';
import { ServerSideProps } from '@/types/commonTypes';

const limit = TABLE_LIMIT;

type PropsT = {
  tagsList: TagItem[];
} & ServerSideProps;

export default function Home({ tagsList }: PropsT) {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const { searchText, debouncedText, setSearchText } = useDebounce('');
  const page = searchParams.get('page');
  const tag = searchParams.get('tag');
  const currPage = page ? +page : 1;

  const handleCurrPage = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('page', term);
    } else {
      params.delete('page');
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const handleSearchTag = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('tag', term);
    } else {
      params.delete('tag');
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const { data: coinList } = useQuery<SymbolsListResultApi>({
    queryKey: [
      endpoints.symbols.getSymbols.url,
      {
        method: endpoints.symbols.getSymbols.method,
        filter: debouncedText,
        limit,
        skip: limit * (currPage - 1),
        tag,
      },
    ],
  });

  const pageCount = coinList?.data?.page_count ?? 1;

  return (
    <>
      <Head>
        <link rel='canonical' href='/' />
      </Head>

      <Layout>
        <MaxWidthWrapper className='mt-10 p-6 rounded-lg bg-background grow w-full'>
          <HomepageTableHeader
            tagsList={tagsList}
            tag={tag}
            search={searchText}
            setSearchText={setSearchText}
            handleSearchTag={handleSearchTag}
          />
          {!coinList ? (
            <LoadingSkeleton />
          ) : (
            <>
              <PairsTable coinList={coinList} />
              <TablePagingation
                currPage={currPage}
                handleCurrPage={handleCurrPage}
                pageCount={pageCount}
              />
            </>
          )}
        </MaxWidthWrapper>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const tagsList = await fetchJson(
    process.env.NEXT_PUBLIC_BASE_API_URL + '/api/v1/tags'
  );

  return {
    revalidate: 3600,
    props: { tagsList: tagsList?.data },
  };
}
