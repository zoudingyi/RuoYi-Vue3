import { reactive, toRefs, onMounted } from 'vue';

/**
 * @description table 页面操作方法封装
 * @param {Function} api 获取表格数据 api 方法(必传)
 * @param {Object} options 获取数据初始化参数(非必传) onPreprocess必须返回一个promise
 * */
export const useTable = (api, options) => {
  const {
    tableRef,
    searchParams = {},
    pages, // 自定义pages参数
    autorun = true, // 自动执行
    onPreprocess, // 自动执行的预处理
    onSuccess,
    onFinally
  } = options;

  const state = reactive({
    loading: false,
    tableData: [],
    pages: {
      page: 1,
      pageSize: 20
    },
    total: 0
  });

  if (pages) state.pages = pages;

  const getTableData = () => {
    const params = {
      ...searchParams,
      ...state.pages
    };
    state.loading = true;
    api(params)
      .then(res => {
        // 返回数据格式层级可能不同，可以自行调整
        const { data, list, total } = res.data;
        state.tableData = (data || list || res.data) ?? [];
        state.total = total ?? res.total;
        onSuccess && onSuccess(res);
        tableRef && tableRef.value.setScrollTop(0);
      })
      .finally(() => {
        state.loading = false;
        onFinally && onFinally();
      });
  };

  onMounted(() => {
    // 是否自动获取接口数据
    if (autorun) {
      // 获取接口数据之前的处理
      if (onPreprocess) {
        state.loading = true;
        onPreprocess().then(() => getTableData());
      } else {
        getTableData();
      }
    }
  });

  return {
    ...toRefs(state),
    getTableData
  };
};
