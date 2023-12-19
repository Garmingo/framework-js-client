/*
 *   Copyright (c) 2023 Garmingo
 *   All rights reserved.
 *   Unauthorized use, reproduction, and distribution of this source code is strictly prohibited.
 */
import stripJsonComments from 'strip-json-comments';


const frameworkConfig = JSON.parse(stripJsonComments(LoadResourceFile(GetCurrentResourceName(), 'config.json')));