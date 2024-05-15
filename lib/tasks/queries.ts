import type {SupabaseClient} from '@supabase/supabase-js';

type Client = SupabaseClient;

export function getTasks(
  client: Client,
  params: {
    pageIndex: number;
    perPage: number;
    sortBy?: string;
    priority?: string;
    deadline?: string;
  },
) {
  const {perPage, pageIndex, sortBy, priority, deadline} = params;
  const {startOffset, endOffset} = getPaginationOffsets(pageIndex, perPage);
  const {orderType, orderAscending} = setOrderType(sortBy);

  let query = client
    .from('tasks')
    .select('*', {count: 'exact'})
    .order(orderType, {ascending: orderAscending})
    .range(startOffset, endOffset);

  query = applyFilter(query, 'priority', priority);
  query = applyFilter(query, 'deadline', deadline);

  return query;
}

function setOrderType(sortBy: string | undefined) {
  let orderType = 'created_at';
  let orderAscending = true;

  if (sortBy && (sortBy === 'nearest' || sortBy === 'furthest')) {
    orderType = 'deadline';

    if (sortBy === 'furthest') {
      orderAscending = false;
    }
  }

  return {orderType, orderAscending};
}

function applyFilter(query: any, filterBy: string, filterValue: string | undefined) {
  if (filterValue) {
    query = query.filter(filterBy, 'in', `(${filterValue})`);
  }

  return query;
}


function getPaginationOffsets(pageIndex: number, perPage: number) {
  const pageSize = perPage;
  const startOffset = pageIndex * pageSize;
  const endOffset = startOffset + pageSize;

  return {
    startOffset,
    endOffset,
  };
}