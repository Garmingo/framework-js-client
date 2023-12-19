/*
 *   Copyright (c) 2023 Garmingo
 *   All rights reserved.
 *   Unauthorized use, reproduction, and distribution of this source code is strictly prohibited.
 */
import stripJsonComments from "strip-json-comments";

export type FrameworkConfig = {
  AutoDetect: boolean;
  Framework: "None" | "QBCore" | "ESX Legacy" | "ESX Infinity" | "Custom";
  ESXEvent: string;
  ExportResource: string;
};

export class Framework {
  private config: FrameworkConfig;
  private framework: any;

  constructor() {
    this.config = JSON.parse(
      stripJsonComments(
        LoadResourceFile(GetCurrentResourceName(), "framework.json")
      )
    );

    if (!this.config.Framework) {
      console.log(
        "No framework selected. Please select a framework in framework.json"
      );
      return;
    }

    console.log(
      `Framework: ${this.config.Framework} is selected. Initializing...`
    );

    if (this.config.Framework === "None") {
      this.framework = {};
      return;
    }

    /* -- Initialize Framework -- */
    while (!this.framework) {
      switch (this.config.Framework) {
        case "ESX Legacy":
          this.framework = exports["es_extended"].getSharedObject();
          break;
        case "ESX Infinity":
          emit(this.config.ESXEvent, (obj: any) => {
            this.framework = obj;
          });
          break;
        case "QBCore":
          this.framework = exports["qb-core"].GetCoreObject();
          break;
        case "Custom":
          this.framework = {};
          break;
      }
    }
    /* -- Initialize Framework -- */
  }

  /**
   * Returns the framework config
   * @returns {FrameworkConfig} FrameworkConfig
   */
  public getConfig(): FrameworkConfig {
    return this.config;
  }

  /**
   * Checks if the framework is initialized
   * @returns {boolean} whether the framework is initialized
   */
  public isInitialized(): boolean {
    return !!this.framework;
  }

  /**
   * Returns the raw framework object
   * @returns {any} framework
   */
  public getFramework(): any {
    return this.framework;
  }

  /**
   * Returns the framework name
   * @returns {string} framework name
   */
  public getFrameworkName(): string {
    return this.config.Framework;
  }

  /**
   * Returns the name of the players job
   * @returns {string} job name
   */
  public getPlayerJobName(): string {
    switch (this.config.Framework) {
      case "ESX Legacy":
        return this.framework.GetPlayerData().job.name;
      case "ESX Infinity":
        return this.framework.GetPlayerData().job.name;
      case "QBCore":
        return this.framework.functions.GetPlayerData().job.name;
      case "Custom":
        return exports[this.config.ExportResource].GetPlayerJobName();
      default:
        return "";
    }
  }


  /**
   * Returns the grade of the players job
   * @returns {number} job grade
   */
  public getPlayerJobGrade(): number {
    switch (this.config.Framework) {
      case "ESX Legacy":
        return this.framework.GetPlayerData().job.grade;
      case "ESX Infinity":
        return this.framework.GetPlayerData().job.grade;
      case "QBCore":
        return this.framework.functions.GetPlayerData().job.grade;
      case "Custom":
        return exports[this.config.ExportResource].GetPlayerJobGrade();
      default:
        return 0;
    }
  }

  /**
   * Returns the count of a specific item in the players inventory
   * @param item item name
   * @returns {number} item count
   */
  public getInventoryItemCount(item: string): number {
    switch (this.config.Framework) {
      case "ESX Legacy":
        for (let i of this.framework.GetPlayerData().inventory) {
          if (i.name === item) {
            return i.count;
          }
        }
        return 0;
      case "ESX Infinity":
        for (let i of this.framework.GetPlayerData().inventory) {
          if (i.name === item) {
            return i.count;
          }
        }
        return 0;
      case "QBCore":
        return this.framework.Functions.GetPlayerData().Functions.GetItemsByName(item).amount;
      case "Custom":
        return exports[this.config.ExportResource].GetInventoryItemCount(item);
      default:
        return 0;
    }
  }

  /**
   * Adds the keys for a car to the players keys
   * (QB-Core only)
   * @param plate car plate
   */
  public addCarKeys(plate: string) {
    if (this.config.Framework === 'QBCore') {
      emit("qb-vehiclekeys:client:AddKeys", plate);
    }
  }

}
