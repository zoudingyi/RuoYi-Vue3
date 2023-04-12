/**
 * @description table 页面操作方法封装
 * @param {Function} api 获取表格数据 api 方法(必传)
 * @param {Object} options 获取数据初始化参数(非必传) onPreprocess必须返回一个promise
 * */
export const useTable = (api, options) => {
  const {
    tableRef,
    searchParams = {},
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

  const getTableData = () => {
    const params = {
      ...searchParams,
      ...state.pages
    };
    state.loading = true;
    api(params)
      .then(res => {
        const { data, list, total } = res.data;
        state.tableData = (data || list) ?? [];
        state.total = total;
        tableRef && tableRef.value.setScrollTop(0);
        onSuccess && onSuccess();
      })
      .finally(() => {
        state.loading = false;
        onFinally && onFinally();
      });
  };

  onMounted(() => {
    if (autorun) {
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
