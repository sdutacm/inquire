"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../../enums/index");
Component({
    properties: {
        status: {
            type: String,
            value: index_1.EnumApiStatus.fetching,
        },
        title: {
            type: String,
            value: '',
        },
    },
    data: {
        enumStatus: index_1.EnumApiStatus,
    },
    methods: {
        fetch: function () {
            this.triggerEvent('fetch');
        },
    },
    options: {
        styleIsolation: 'apply-shared',
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDJDQUFrRDtBQUdsRCxTQUFTLENBQUM7SUFJUixVQUFVLEVBQUU7UUFDVixNQUFNLEVBQUU7WUFDTixJQUFJLEVBQUUsTUFBTTtZQUNaLEtBQUssRUFBRSxxQkFBYSxDQUFDLFFBQVE7U0FDOUI7UUFDRCxLQUFLLEVBQUU7WUFDTCxJQUFJLEVBQUUsTUFBTTtZQUNaLEtBQUssRUFBRSxFQUFFO1NBQ1Y7S0FDRjtJQUtELElBQUksRUFBRTtRQUNKLFVBQVUsRUFBRSxxQkFBYTtLQUMxQjtJQUtELE9BQU8sRUFBRTtRQUNQLEtBQUs7WUFFSCxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzdCLENBQUM7S0FDRjtJQUVELE9BQU8sRUFBRTtRQUNQLGNBQWMsRUFBRSxjQUFjO0tBQy9CO0NBQ0YsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRW51bUFwaVN0YXR1cyB9IGZyb20gJy4uLy4uL2VudW1zL2luZGV4JztcblxuLy8gQHRzLWlnbm9yZVxuQ29tcG9uZW50KHtcbiAgLyoqXG4gICAqIOe7hOS7tueahOWxnuaAp+WIl+ihqFxuICAgKi9cbiAgcHJvcGVydGllczoge1xuICAgIHN0YXR1czoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgdmFsdWU6IEVudW1BcGlTdGF0dXMuZmV0Y2hpbmcsXG4gICAgfSxcbiAgICB0aXRsZToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgdmFsdWU6ICcnLFxuICAgIH0sXG4gIH0sXG5cbiAgLyoqXG4gICAqIOe7hOS7tueahOWIneWni+aVsOaNrlxuICAgKi9cbiAgZGF0YToge1xuICAgIGVudW1TdGF0dXM6IEVudW1BcGlTdGF0dXMsXG4gIH0sXG5cbiAgLyoqXG4gICAqIOe7hOS7tueahOaWueazleWIl+ihqFxuICAgKi9cbiAgbWV0aG9kczoge1xuICAgIGZldGNoKCkge1xuICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgdGhpcy50cmlnZ2VyRXZlbnQoJ2ZldGNoJyk7XG4gICAgfSxcbiAgfSxcblxuICBvcHRpb25zOiB7XG4gICAgc3R5bGVJc29sYXRpb246ICdhcHBseS1zaGFyZWQnLFxuICB9LFxufSk7XG4iXX0=