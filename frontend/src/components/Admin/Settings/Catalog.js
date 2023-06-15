import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Accordion } from "./Accordion";
import { AccordionSummary } from "./AccordionSummary";
import { AccordionDetails } from "./AccordionDetails";
import { useAlert } from "../../../common/hooks/use-alert";
import {
  createUpdateSettings,
  getAllSettings,
  clearErrors,
  createSettingsReset,
} from "../../../store";
import { getToolbarValue } from "../../../common/attribute";
import "./Catalog.css";

export const Catalog = (props) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { success, loading, error } = useSelector((state) => state.settings);
  const { settings, loading: loadingSettings } = useSelector(
    (state) => state.getSettings
  );
  const [expanded, setExpanded] = useState(false);
  const [listMode, setListMode] = useState("grid");
  const [perPageInGrid, setPerPageInGrid] = useState("12,24,36,48");
  const [perPageInGridDefault, setPerPageInGridDefault] = useState("12");
  const [perPageInList, setPerPageInList] = useState("5,10,15,20,25");
  const [perPageInListDefault, setPerPageInListDefault] = useState("10");
  const [baseImage, setBaseImage] = useState("");
  const [smallImage, setSmallImage] = useState("");
  const [thumbnailImage, setThumbnailImage] = useState("");
  const [allowAll, setAllowAll] = useState("yes");
  const [listSortBy, setListSortBy] = useState("position");
  const [productUrlSuffix, setProductUrlSuffix] = useState("");
  const [categoryUrlSuffix, setCategoryUrlSuffix] = useState("");
  const [useCategoryPathForProductUrls, setUseCategoryPathForProductUrls] =
    useState(false);
  const [pageTitleSeparator, setPageTitleSeparator] = useState("");
  const [useCanonicalLinkForCategoryPage, setUseCanonicalLinkForCategoryPage] =
    useState("");
  const [useCanonicalLinkForProductPage, setUseCanonicalLinkForProductPage] =
    useState("");

  useEffect(() => {
    dispatch(getAllSettings());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      alert.success("Settings saved successfully");
      dispatch(createSettingsReset());
    }
  }, [alert, success, dispatch]);

  useEffect(() => {
    if (error) {
      alert.error(error.error);
      dispatch(clearErrors());
    }
  }, [alert, error, dispatch]);

  useEffect(() => {
    if (!loadingSettings && settings.length !== 0) {
      if (getToolbarValue(settings, "catalog/list_mode")) {
        setListMode(getToolbarValue(settings, "catalog/list_mode"));
      }
      if (getToolbarValue(settings, "catalog/per_page_in_grid")) {
        setPerPageInGrid(getToolbarValue(settings, "catalog/per_page_in_grid"));
      }
      if (getToolbarValue(settings, "catalog/per_page_in_grid_default")) {
        setPerPageInGridDefault(
          getToolbarValue(settings, "catalog/per_page_in_grid_default")
        );
      }
      if (getToolbarValue(settings, "catalog/per_page_in_list")) {
        setPerPageInList(getToolbarValue(settings, "catalog/per_page_in_list"));
      }
      if (getToolbarValue(settings, "catalog/per_page_in_list_default")) {
        setPerPageInListDefault(
          getToolbarValue(settings, "catalog/per_page_in_list_default")
        );
      }
      if (getToolbarValue(settings, "catalog/base_image")) {
        setBaseImage(getToolbarValue(settings, "catalog/base_image"));
      }
      if (getToolbarValue(settings, "catalog/small_image")) {
        setSmallImage(getToolbarValue(settings, "catalog/small_image"));
      }
      if (getToolbarValue(settings, "catalog/thumbnail_image")) {
        setThumbnailImage(getToolbarValue(settings, "catalog/thumbnail_image"));
      }
      if (getToolbarValue(settings, "catalog/allow_all")) {
        setAllowAll(getToolbarValue(settings, "catalog/allow_all"));
      }
      if (getToolbarValue(settings, "catalog/list_sort_by")) {
        setListSortBy(getToolbarValue(settings, "catalog/list_sort_by"));
      }
      if (getToolbarValue(settings, "catalog/product_url_suffix")) {
        setProductUrlSuffix(
          getToolbarValue(settings, "catalog/product_url_suffix")
        );
      }
      if (getToolbarValue(settings, "catalog/category_url_suffix")) {
        setCategoryUrlSuffix(
          getToolbarValue(settings, "catalog/category_url_suffix")
        );
      }
      if (
        getToolbarValue(settings, "catalog/use_category_path_for_product_urls")
      ) {
        setUseCategoryPathForProductUrls(
          getToolbarValue(
            settings,
            "catalog/use_category_path_for_product_urls"
          )
        );
      }
      if (getToolbarValue(settings, "catalog/page_title_separator")) {
        setPageTitleSeparator(
          getToolbarValue(settings, "catalog/page_title_separator")
        );
      }
      if (
        getToolbarValue(
          settings,
          "catalog/use_canonical_link_for_category_page"
        )
      ) {
        setUseCanonicalLinkForCategoryPage(
          getToolbarValue(
            settings,
            "catalog/use_canonical_link_for_category_page"
          )
        );
      }
      if (
        getToolbarValue(settings, "catalog/use_canonical_link_for_product_page")
      ) {
        setUseCanonicalLinkForProductPage(
          getToolbarValue(
            settings,
            "catalog/use_canonical_link_for_product_page"
          )
        );
      }
    }
  }, [settings, loadingSettings]);

  const handleChange = (panel) => (_event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const settingsSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createUpdateSettings([
        {
          path: "catalog/list_mode",
          value: listMode,
        },
        {
          path: "catalog/per_page_in_grid",
          value: perPageInGrid,
        },
        {
          path: "catalog/per_page_in_grid_default",
          value: perPageInGridDefault,
        },
        {
          path: "catalog/per_page_in_list",
          value: perPageInList,
        },
        {
          path: "catalog/per_page_in_list_default",
          value: perPageInListDefault,
        },
        {
          path: "catalog/base_image",
          value: baseImage,
        },
        {
          path: "catalog/small_image",
          value: smallImage,
        },
        {
          path: "catalog/thumbnail_image",
          value: thumbnailImage,
        },
        {
          path: "catalog/allow_all",
          value: allowAll,
        },
        {
          path: "catalog/list_sort_by",
          value: listSortBy,
        },
        {
          path: "catalog/product_url_suffix",
          value: productUrlSuffix,
        },
        {
          path: "catalog/category_url_suffix",
          value: categoryUrlSuffix,
        },
        {
          path: "catalog/use_category_path_for_product_urls",
          value: useCategoryPathForProductUrls,
        },
        {
          path: "catalog/page_title_separator",
          value: pageTitleSeparator,
        },
        {
          path: "catalog/use_canonical_link_for_category_page",
          value: useCanonicalLinkForCategoryPage,
        },
        {
          path: "catalog/use_canonical_link_for_product_page",
          value: useCanonicalLinkForProductPage,
        },
      ])
    );
    dispatch(getAllSettings());
  };

  const baseImageHandler = (e) => {
    setBaseImage(e.target.value);
  };

  const smallImageHandler = (e) => {
    setSmallImage(e.target.value);
  };

  const thumbnailImageHandler = (e) => {
    setThumbnailImage(e.target.value);
  };

  if (loading || loadingSettings) {
    return <></>;
  }

  return (
    <div className="Catalog">
      <Typography className="setting-title">{props.title}</Typography>
      <form onSubmit={settingsSubmitHandler} method="post">
        <Button type="submit">Save</Button>
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography>Storefront</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="setting_row">
              <label htmlFor="list_mode">List Mode</label>
              <select
                id="list_mode"
                onChange={(e) => setListMode(e.target.value)}
                defaultValue={listMode}
              >
                <option value={"grid"}>Grid Only</option>
                <option value={"list"}>List Only</option>
                <option value={"grid_list"}>Grid (default)/List</option>
                <option value={"list_grid"}>List (default)/Grid</option>
              </select>
            </div>
            <div className="setting_row">
              <label>Product per Page on Grid Allowed Values</label>
              <input
                type={"text"}
                placeholder="Product per Page on Grid Allowed Values"
                required
                value={perPageInGrid}
                onChange={(e) => setPerPageInGrid(e.target.value)}
              />
            </div>
            <div className="setting_row">
              <label>Product per Page on Grid Default Value</label>
              <input
                type={"text"}
                placeholder="Product per Page on Grid Default Value"
                required
                value={perPageInGridDefault}
                onChange={(e) => setPerPageInGridDefault(e.target.value)}
              />
              <span>Must be in the Allowed values list</span>
            </div>
            <div className="setting_row">
              <label>Product per Page on List Allowed Values</label>
              <input
                type={"text"}
                placeholder="Product per Page on Grid Allowed Values"
                required
                value={perPageInList}
                onChange={(e) => setPerPageInList(e.target.value)}
              />
            </div>
            <div className="setting_row">
              <label>Product per Page on List Default Value</label>
              <input
                type={"text"}
                placeholder="Product per Page on List Default Value"
                required
                value={perPageInListDefault}
                onChange={(e) => setPerPageInListDefault(e.target.value)}
              />
              <span>Must be in the Allowed values list</span>
            </div>
            <div className="setting_row">
              <label>Product Listing Sort By</label>
              <select
                onChange={(e) => setListSortBy(e.target.value)}
                defaultValue={listSortBy}
              >
                <option value={"position"}>Position</option>
                <option value={"price"}>Price</option>
                <option value={"title"}>Name</option>
              </select>
            </div>
            <div className="setting_row">
              <label>Allow All Products per Page</label>
              <select
                onChange={(e) => setAllowAll(e.target.value)}
                defaultValue={allowAll}
              >
                <option value={"yes"}>Yes</option>
                <option value={"no"}>No</option>
              </select>
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
            <Typography>Search Engine Optimization</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="setting_row">
              <label>Product Url Suffix</label>
              <input
                type={"text"}
                value={productUrlSuffix}
                onChange={(e) => setProductUrlSuffix(e.target.value)}
              />
            </div>
            <div className="setting_row">
              <label>Category Url Suffix</label>
              <input
                type={"text"}
                value={categoryUrlSuffix}
                onChange={(e) => setCategoryUrlSuffix(e.target.value)}
              />
            </div>
            <div className="setting_row">
              <label>Use Category Path for Product Urls</label>
              <select
                onChange={(e) =>
                  setUseCategoryPathForProductUrls(e.target.value)
                }
                defaultValue={useCategoryPathForProductUrls}
              >
                <option value={"yes"}>Yes</option>
                <option value={"no"}>No</option>
              </select>
            </div>
            <div className="setting_row">
              <label>Page Title Separator</label>
              <input
                type={"text"}
                value={pageTitleSeparator}
                onChange={(e) => setPageTitleSeparator(e.target.value)}
              />
            </div>
            <div className="setting_row">
              <label>Use Canonical Link Meta Tag for Categories</label>
              <select
                onChange={(e) =>
                  setUseCanonicalLinkForCategoryPage(e.target.value)
                }
                defaultValue={useCanonicalLinkForCategoryPage}
              >
                <option value={"yes"}>Yes</option>
                <option value={"no"}>No</option>
              </select>
            </div>
            <div className="setting_row">
              <label>Use Canonical Link Meta Tag for Products</label>
              <select
                onChange={(e) =>
                  setUseCanonicalLinkForProductPage(e.target.value)
                }
                defaultValue={useCanonicalLinkForProductPage}
              >
                <option value={"yes"}>Yes</option>
                <option value={"no"}>No</option>
              </select>
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
        >
          <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
            <Typography>Product Image Placeholders</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="setting_row">
              <label htmlFor="baseImage">Base</label>
              <input
                type={"file"}
                name="baseImage"
                id="baseImage"
                onChange={(e) => baseImageHandler(e)}
                accept="image/*"
              />
            </div>
            <div className="setting_row">
              <label htmlFor="smallImage">Small</label>
              <input
                type={"file"}
                name="smallImage"
                id="smallImage"
                accept="image/*"
                onChange={(e) => smallImageHandler(e)}
              />
            </div>
            <div className="setting_row">
              <label htmlFor="thumbnailImage">Thumbnail</label>
              <input
                type={"file"}
                name="thumbnailImage"
                id="thumbnailImage"
                onChange={(e) => thumbnailImageHandler(e)}
                accept="image/*"
              />
            </div>
          </AccordionDetails>
        </Accordion>
      </form>
    </div>
  );
};
